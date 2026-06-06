import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Route: Send secure lead email
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, phone, company, website, revenue, message, dossier } = req.body;

      // Validate required elements
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required contact parameters (Name, Email, or Phone)." });
      }

      const cleanValue = (val: string | undefined): string => {
        if (!val) return "";
        return val.trim().replace(/^['"]|['"]$/g, "");
      };

      const smtpHost = cleanValue(process.env.SMTP_HOST || "smtp.gmail.com");
      const smtpPort = parseInt(cleanValue(process.env.SMTP_PORT || "465"), 10);
      const smtpUser = cleanValue(process.env.SMTP_USER || "highvailbusinessstrategylab@gmail.com");
      const smtpPass = cleanValue(process.env.SMTP_PASS || "");

      // Acknowledge configuration state: fail gracefully with an explanatory message if not configured yet
      if (!smtpPass) {
        console.warn("SMTP_PASS is not configured in the environment. Auto-dispatch suspended.");
        return res.status(412).json({
          error: "SMTP Credentials Pending",
          message: "The automated mail dispatch is fully integrated but cannot send because SMTP_PASS is missing. Please configure it in your Secrets panel.",
          dossier: dossier
        });
      }

      const recipient = "highvailbusinessstrategylab@gmail.com";
      const subject = `[High Vail strategy lab] - Secure Business Briefing: ${company || name}`;
      const textContent = dossier || `HIGH VAIL SECURE BRIEFING REQUEST
------------------------------------------------------------
FOUNDER / OPERATOR    : ${name}
USER DIRECT EMAIL     : ${email}
USER PHONE CONTACT    : ${phone}
ENTERPRISE NAME       : ${company || 'Not Specified'}
CURRENT PORTAL URL    : ${website || 'Not Specified'}
REVENUE MILESTONE     : ${revenue}
------------------------------------------------------------
GROWTH BOTTLENECK ANALYSIS:
------------------------------------------------------------
${message || 'No details provided.'}`;

      const isBrevo = 
        smtpHost.includes("brevo.com") || 
        smtpHost.includes("sendinblue.com") || 
        smtpPass.startsWith("xsmtpsib-");

      // 1. Direct call to Brevo HTTP API to bypass authorized IP restrictions on SMTP
      if (isBrevo) {
        console.log("Found Brevo target. Using direct HTTP API to bypass IP authorization constraints...");
        try {
          const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": smtpPass,
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({
              sender: {
                name: "High Vail Lab",
                email: recipient
              },
              to: [
                {
                  email: recipient,
                  name: "High Vail Strategy Lab"
                }
              ],
              replyTo: {
                email: email,
                name: name
              },
              subject: subject,
              textContent: textContent
            })
          });

          if (response.ok) {
            console.log("Email successfully dispatched via Brevo HTTP API!");
            return res.json({ success: true, message: "Secure briefing successfully transmitted via Brevo API." });
          } else {
            const errorResult = await response.json().catch(() => ({}));
            console.error("Brevo API replied with rejection:", errorResult);
            return res.status(400).json({
              error: "Brevo API Dispatch Failed",
              message: errorResult.message || "Brevo API rejected the dispatch request. Please verify that highvailbusinessstrategylab@gmail.com is listed as a verified sender inside your Brevo account dashboard, or check your account's active status.",
              details: errorResult
            });
          }
        } catch (apiError: any) {
          console.error("Brevo REST request exception:", apiError);
          return res.status(502).json({
            error: "Brevo Connection Error",
            message: `Could not connect to Brevo REST services: ${apiError.message || apiError}`
          });
        }
      }

      // 2. Cascade fallback: Direct SMTP Mail Delivery for non-Brevo accounts
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for port 465, false for port 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `High Vail Lab <${recipient}>`, // Configured exactly as requested: highvailbusinessstrategylab@gmail.com
        to: recipient, // Both sender & receiver are highvailbusinessstrategylab@gmail.com
        replyTo: email, // Keep user's email as the replyTo contact point so they can reply directly
        subject: subject,
        text: textContent,
      };

      await transporter.sendMail(mailOptions);
      console.log("Automated briefing email successfully dispatched via SMTP to", recipient);
      
      return res.json({ success: true, message: "Secure briefing successfully transmitted." });
    } catch (error: any) {
      console.error("Nodemailer dispatch error:", error);
      return res.status(500).json({
        error: "Dispatch Failed",
        message: error.message || "An error occurred during automated e-mail dispatch."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
