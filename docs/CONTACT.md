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

## Turning email on — step by step

Free tier: **3,000 emails a month, 100 a day, one domain.** Far more than an
enquiry form needs.

### 1. Create the account

Sign up at [resend.com](https://resend.com). No card needed for the free plan.

### 2. Add the domain

**Domains → Add Domain →** enter `zeizzlabs.com` and pick a region.

Resend offers **us-east-1** (Virginia), **eu-west-1** (Ireland), **sa-east-1**
(São Paulo) and **ap-northeast-1** (Tokyo). There is no Mumbai region, so
**Tokyo is the closest option to India** — pick that.

The region is **immutable**. Changing it later means deleting the domain,
re-adding it and redoing every DNS record with a fresh DKIM key, so it is worth
getting right the first time.

Resend then shows you three DNS records. They sit on a **`send` subdomain**, not
the root — that is deliberate, so your main domain's email reputation stays
separate from what the site sends.

### 3. Add those records in GoDaddy

**GoDaddy → My Products → zeizzlabs.com → DNS → Add New Record.**

⚠️ **GoDaddy appends the domain for you.** Resend shows the full hostname, but
GoDaddy wants only the part in front. Get this wrong and you create
`send.zeizzlabs.com.zeizzlabs.com`, which silently never verifies.

| Resend shows | Type | Enter in GoDaddy as | Value |
| --- | --- | --- | --- |
| `send.zeizzlabs.com` | **MX** | `send` | the value Resend gives, priority `10` |
| `send.zeizzlabs.com` | **TXT** | `send` | `v=spf1 include:amazonses.com ~all` |
| `resend._domainkey.send.zeizzlabs.com` | **TXT** | `resend._domainkey.send` | the long `p=MIGf...` key from Resend |

Copy and paste the values — do not retype the DKIM key.

> **If verification will not go green,** check the DKIM record's name before
> anything else. It has to sit on the same `send` subdomain as the other two —
> `resend._domainkey.send` in GoDaddy, not `resend._domainkey`. One level off
> and Resend simply never sees it, with no error to tell you why.

### 4. Verify

Back in Resend, press **Verify DNS Records**. Usually done within 15 minutes; it
can take up to a few hours. Re-press it, do not re-add the records.

### 5. Get the key

**API Keys → Create API Key.** Name it `zeizzlabs-site`, permission **Sending
access**. Copy it — starts with `re_`, and it is shown only once.

### 6. Wire it up

```bash
netlify env:set RESEND_API_KEY "re_your_key_here"
netlify env:set CONTACT_FROM "ZeizzLabs <noreply@send.zeizzlabs.com>"
netlify deploy --build --prod
```

`CONTACT_FROM` must be on the domain you verified. If Resend verified
`send.zeizzlabs.com`, send from that subdomain.

### 7. Test it

Submit the form on the live site and confirm the mail arrives. Check spam the
first time.

## Where enquiries go

`CONTACT_TO` controls the recipients; it defaults to
`zeizzlabs@gmail.com`. Override with a comma-separated
list:

```bash
netlify env:set CONTACT_TO "zeizzlabs@gmail.com,someone@zeizzlabs.com"
```

Replies go to the enquirer's own address, so you can answer straight from your
inbox.

## Sending is not receiving

This trips people up, so it is worth being blunt about:

**Resend only SENDS.** Verifying `zeizzlabs.com` there lets the site send mail
*as* your domain. It does not create a mailbox and it cannot receive anything.

`zeizzlabs@gmail.com` is the address printed on your site and the
first recipient of every enquiry. If no mailbox exists behind it, mail sent
there **bounces**. Three ways to fix that:

1. **Google Workspace** — about ₹136/user/month, a real inbox, best option if
   the address is going on business cards.
2. **GoDaddy email** — often bundled with the domain for a year; check
   My Products before paying for anything.
3. **Forward it** — cheapest. Many registrars offer free forwarding, so
   a role address lands in your Gmail. Fine to start with.

Until one of those exists, drop it from the recipient list so enquiries still
reach you:

```bash
netlify env:set CONTACT_TO "zeizzlabs@gmail.com"
```

Gmail keeps working as a recipient regardless — it is a normal mailbox. Only the
address on your own domain needs setting up.
