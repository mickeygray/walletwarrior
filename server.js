const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nodemailer = require("nodemailer");

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post("/api/contact", (req, res) => {
    const { fullName, email } = req.body;

    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "WalletWarriorsForm@gmail.com",
        pass: "qw12as34",
      },
    });
    const mailer2 = {
      title: "New Form From Wallet Warriors",
      from: "Wallet Warriors",
      to: ["mickeygray85@hotmail.com"],
      subject: `New Form From Wallet Warriors`,
      text: ` New Form Recieved on ${Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: "America/Los_Angeles",
        },
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      ).format(new Date(Date.now()))} . Name: ${fullName}, email:${email}.`,
    };

    transporter.sendMail(mailer2);
    res.send("success");
  });

  server.post("/api/lookup", async (req, res) => {
    //const { ipadd } = req.body

    console.log(req.body.ip);

    const endTime = new Date().getTime();

    const { ip, clicks, lead } = req.body;

    const totalTime = (endTime - ip.startTime) / 60000;

    console.log(clicks);

    const clickIntervals = clicks.map((click) => {
      let obj = {
        clickTime: `${(click.time - ip.startTime) / 60000} minutes after load`,
        loc: click.loc,
        btn: click.btn,
      };
      return obj;
    });

    const timestamp = new Date(Date.now());

    const final = { ip, timestamp, totalTime, clickIntervals, lead };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "WalletWarriorsForm@gmail.com",
        pass: "qw12as34",
      },
    });
    const mailer2 = {
      title: "Latest visitors of Wallet Warriors",
      from: "Wallet Warriors",
      to: ["mickeygray85@hotmail.com"],
      subject: "Latest Visitor to Wallet Warriors",
      text: `${JSON.stringify(final)}`,
    };

    transporter.sendMail(mailer2);

    res.send("success");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Read on http://localhost:3000");
  });
});
