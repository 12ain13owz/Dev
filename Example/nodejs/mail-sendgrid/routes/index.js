const fs = require('fs')
const express = require('express')
const router = express.Router()
const config = require('../config')

const SENDGRID_API_KEY = config.apikey;
const SENDGRID_SENDER = config.sender;
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

router.get('/', home)
router.post('/test', test)
router.post('/hello', onSendmail)

router.get('/send', SendSingle)

module.exports = router

function home(req, res) {
  res.render('index')
}

function test(req, res) {
  res.send('post text')
}

function onSendmail(req, res, next) {
  const sgReq = Sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{ email: req.body.email }],
        subject: 'Hello World! Test Send'
      }],
      from: { email: SENDGRID_SENDER },
      content: [{
        type: 'text/plain',
        value: 'SendGrid on App Engine with Node.js.'
      }]
    }
  });

  Sendgrid.API(sgReq, (err) => {
    if (err) {
      next(err);
      return;
    }
    // Render the index route on success
    res.send({ title: 'Send mail success' })
    return;
  });
}

function SendSingle(req, res, next) {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(SENDGRID_API_KEY)

  const msg = {
    to: SENDGRID_SENDER,
    from: SENDGRID_SENDER,
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    templateId: 'd-a9a16766afd943e596242f56bdd4cb25',
    dynamic_template_data: {
      subject: 'Testing Templates',
      name: 'Some One',
      city: 'Denver',
    },
    attachments: [
      {
        content: base64_encode('public/pdf/test.pdf'),
        filename: 'some-attachment.pdf',
        type: 'plain/text',
        disposition: 'attachment',
        content_id: 'mytext'
      },
    ],
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send('success')
    })
    .catch(err => {
      console.log(err.toString())
      res.send('error')
    })
}

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}



