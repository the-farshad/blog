---
title: Introducing kurdishscholars.org
date: 2026-04-24
---

Hey &mdash; I want to show you something I've been building on the
side. It's live now at
[kurdishscholars.org](https://kurdishscholars.org), and I'd love for
you to sign up, poke around, and tell me what's broken.

Short version: it's a platform for Kurdish **students, academics,
researchers, and developers** &mdash; a place to find each other,
share what we're working on, and actually organise across four
countries and a very large diaspora. Independent project. Not
affiliated with any institution, government, or party. Just
infrastructure that the community owns.

## Who it's for

Kurdish academic and professional life is scattered, and the tools we
use to stay in touch belong to companies that can change the rules
overnight. I wanted one place that takes each of these groups
seriously as a first-class audience:

- **Students** &mdash; undergrads, grads, anyone with an
  institutional email. Find classmates, ask for advice, see who's at
  your university.
- **Academics and researchers** &mdash; faculty, postdocs, PhD
  students. Post papers, calls for collaboration, reading groups.
  Verify once with your university email and you're in.
- **Developers and engineers** &mdash; there's a proper developer
  portal at
  [developers.kurdishscholars.org](https://developers.kurdishscholars.org)
  for registering apps, reading API docs, and building on top of the
  platform. If you want to plug something into it, you can.
- **Community and industry members** &mdash; people who left
  academia, or never went, but want to stay connected. Manual chapter
  selection, same access to most things.

## What's on it

- **Feed** &mdash; text, links, events, announcements.
- **Network** &mdash; searchable member directory with follow /
  connection relationships.
- **Messaging** &mdash; direct messages, with an optional real-time
  Firestore backend if a chapter needs it.
- **Chapters** &mdash; a real hierarchy: global &rarr; country
  &rarr; state &rarr; university. Students get placed into their
  university's chapter automatically when they verify their email
  (the domain is matched against a catalog of 2,000+ universities).
- **Governance** &mdash; petitions, polls, and statements, scoped to
  the right audience (global, chapter, or connections).
- **Elections** &mdash; chapter-level elections with candidate
  applications, voting, and results.
- **Opportunities** &mdash; jobs, internships, PhD positions, research
  calls.
- **Marketplace** &mdash; buy / sell / trade listings among members.
- **Blog** &mdash; public-facing, managed from the admin dashboard.
- **Developer portal** &mdash; app registration, connected-apps view
  for users, API documentation.

## Languages

Six locales: **English, Kurmanci, Sorani, Southern Kurdish, Laki, and
Luri**, with right-to-left support where it's needed. All four written
Kurdish variants are first-class, not an afterthought. If you spot
translation mistakes &mdash; and you will &mdash; please tell me.

## The technical bit (for the curious)

Nothing exotic. I picked boring, well-understood tools that will still
be boring in five years:

- **Next.js 16** App Router, TypeScript strict mode.
- **PostgreSQL 16** with raw parameterised SQL. No ORM. Every query
  uses `$1`/`$2` placeholders, so SQL injection isn't a surface.
- **Auth**: passwords hashed with `scrypt` (Node built-in, CPU- and
  memory-hard); sessions are HMAC-SHA256 signed cookies, not JWTs &mdash;
  no algorithm-confusion attack surface. Separate secrets and
  cookies for member vs admin sessions. `httpOnly`, `SameSite=Lax`.
- **Authorization**: a single rule engine
  (`lib/connect-permissions.ts`) decides who can see what, based on
  audience (`public | members | chapter | connections`), block
  relationships, and per-field privacy flags on profiles.
- **Verification**: institutional email auto-verifies against the
  university catalog; non-academic members can upload a student ID or
  enrolment letter for manual admin review.
- **File storage**: any S3-compatible provider (currently
  DigitalOcean Spaces). MIME allowlist, 10 MB cap,
  timestamp-based filenames.
- **Email**: Resend. **CAPTCHA**: Cloudflare Turnstile on login and
  signup.
- **Rate limiting**: in-memory limiter on every unauthenticated auth
  endpoint.
- **Deployment**: Docker Compose on a plain Linux VPS &mdash; `app`
  (Next.js standalone), `db` (Postgres 16), `nginx` (TLS), `certbot`
  (Let's Encrypt renewal), and a `mailserver`. One `./deploy.sh`
  rsyncs, builds, and reloads.

What I deliberately didn't do: no tracking, no ads, no analytics SDKs,
no user data sold, no social-login lock-in. The whole thing runs on
one VPS.

## What I want from you

Honestly? Use it and break it.

- If you're a **student or researcher**, sign up with your
  university email. Post something. Tell me where the flow feels
  wrong.
- If you're a **developer**, try the developer portal, build
  something small, and tell me what's missing from the API.
- If you **speak one of the Kurdish variants**, switch the language
  and send me every translation mistake you find.
- If you find a **bug or security issue**, open a GitHub issue (or
  email me privately for anything sensitive).

Pull requests are very welcome. This grows faster with more eyes on
it than it does with just mine.

&mdash; [kurdishscholars.org](https://kurdishscholars.org)
 &middot; [developers.kurdishscholars.org](https://developers.kurdishscholars.org)
