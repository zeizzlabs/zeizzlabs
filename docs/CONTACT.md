# Contact form — how enquiries reach you

## The rule

**An enquiry is never lost.** Every valid submission is written to durable
storage *first* and emailed *second*. Email can fail — a key expires, a provider
has an outage, a domain falls out of verification — and none of that can cost
you a lead.

The form only reports success if the enquiry survived somewhere. If both storage
and email fail, it tells the visitor to use WhatsApp instead rather than
pretending the message was received.

## Right now

| | Status |
| --- | --- |
| Stored durably (Netlify Blobs) | ✅ working |
| Emailed to you | ❌ **not configured** |
| Rate limited | ✅ 5 per IP per 10 minutes |
| Bot honeypot | ✅ |

**Until you add an API key, enquiries are being captured but not emailed.** They
are safe, but you have to go and look for them.

## Reading enquiries without email

```bash
netlify blobs:list enquiries
netlify blobs:get enquiries "<key>"
```

## Turning email on

**Step 1.** Create a free account at [resend.com](https://resend.com).

**Step 2.** Add and verify `zeizzlabs.com` there. Resend gives you DNS records;
add them in GoDaddy the same way you added the site records. Sending from your
own domain is what keeps enquiries out of spam.

**Step 3.** Copy the API key (starts with `re_`).

**Step 4.** Set it on the site:

```bash
netlify env:set RESEND_API_KEY "re_your_key_here"
netlify env:set CONTACT_FROM "ZeizzLabs <enquire@zeizzlabs.com>"
netlify deploy --build --prod
```

`CONTACT_FROM` must be on the domain you verified in step 2, or Resend rejects
the send.

**Step 5.** Send yourself a test through the live form and confirm it arrives.

## Where enquiries go

`CONTACT_TO` controls the recipients; it defaults to
`enquire@zeizzlabs.com,zeizzlabs@gmail.com`. Override with a comma-separated
list:

```bash
netlify env:set CONTACT_TO "enquire@zeizzlabs.com,someone@zeizzlabs.com"
```

Replies go to the enquirer's own address, so you can answer straight from your
inbox.

## Note on the mailbox

`enquire@zeizzlabs.com` is the primary address shown on the site and the first
recipient. It needs to exist as a real mailbox — verifying the domain in Resend
lets you *send* as it, not receive. Set it up in GoDaddy email or Google
Workspace, or drop it from `CONTACT_TO` until it exists.
