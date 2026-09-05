import type { Project } from "@/lib/types";

/**
 * WORK — delivered projects first, then the studio's own R&D shelf.
 *
 * The rule has not changed: every card states its real stage. What changed is
 * that there is now delivered work to put in front of the experiments, so the
 * live builds lead and the R&D follows, still labelled as R&D.
 *
 * Artwork under /media for the delivered entries is a screenshot of the running
 * project, captured from its public URL — not a mockup, and not a stock frame.
 */
export const projects: Project[] = [
  {
    slug: "construction-estimation-platform",
    name: "Construction Estimation Platform",
    category: "Platform · Payments & Documents",
    label: "live",
    summary:
      "Six construction-estimation tools that turn a contractor's quote into a line-by-line bill of quantities, with every rate traceable to an Indian Standard.",
    vision:
      "A homeowner building a house in India is handed one number on a scrap of paper and has no way to test it. The contractor knows the rates; the owner does not, and finds out he overpaid two years later when the money is gone. The free calculators online multiply a built-up area by an invented per-square-foot rate and produce a figure with no material breakdown, no standard behind it, and no document anyone could act on. This is the version that answers to a code.",
    building: [
      "Six estimators — structure, masonry, electrical, plumbing, interiors, and a free Vastu tool",
      "A grand-total view that consolidates every tool into one project budget",
      "Compare-a-quote, so a contractor's figure can be put beside the standards-derived one",
      "Server-generated, typeset PDF reports per tool",
      "Razorpay payments verified server-side before any paid quantity is revealed",
      "Auth with row-level security, an admin dashboard, and full Hindi and English",
    ],
    approach:
      "The standards values are locked and nothing in the application may override them — the entire product is the claim that its numbers are defensible, and a value quietly drifting from its clause does not make the tool slightly less accurate, it makes it confidently wrong. Calculation logic was ported from implementations already checked against real projects rather than re-derived from a specification, because a quantity error in a bill of materials stays invisible until concrete has been poured. Nothing paid is computed in the browser: quantities appear only after the server has verified the payment signature itself.",
    stage:
      "Live, taking payments, in two languages. 163 commits, six paid tools and twenty-five routes.",
    next: [
      "More trades on the same estimation core",
      "Contractor accounts with saved projects",
      "An assistant that answers from the standards, and cites the clause",
    ],
    tech: ["Next.js", "Supabase", "Razorpay", "react-pdf", "next-intl", "TypeScript"],
    client: "Own product",
    accent: ["#dcb877", "#c9a15c"],
    image: "/media/work-construction-estimation-platform.jpg",
  },
  {
    slug: "fashion-delivery-store",
    name: "Fashion Delivery Store",
    category: "Commerce · Payments & Logistics",
    label: "live",
    summary:
      "A 624-product store with live payments and a same-evening delivery promise wired into eight surfaces from a single pair of numbers.",
    vision:
      "A local multi-brand shop competes with national e-commerce on exactly one axis it can win: it is already in your city and can be at your door tonight. That advantage is worth nothing if the site presents itself as a slower marketplace — and it collapses entirely the moment the site tells someone at nine in the evening that tonight is still available.",
    building: [
      "624 products across ten brands, with size, fabric and care data per line",
      "Razorpay checkout with server-side pricing and signature verification",
      "A delivery clock computed in Asia/Kolkata regardless of the device's own clock",
      "A catalogue search and an assistant that share one matcher",
      "A portable admin for orders, across twelve routes",
    ],
    approach:
      "A cutoff hour and a by-hour in the store config drive the ticking top bar, the hero countdown, the product line, the checkout slot picker that disables Tonight mid-session when six passes, the shelf count and a filter facet — nothing anywhere hardcodes a delivery sentence. The server re-derives every price; the browser picks a product, size, colour and quantity and nothing else. Money is integer paise, order lines are a snapshot rather than a join, and a replayed payment callback is a no-op.",
    stage:
      "Live and taking real payments. The assistant answers from the same modules the pages render from, so it cannot drift out of sync with the shop, and it declines rather than guessing.",
    next: [
      "Stock sync from the counter",
      "Return and exchange flows in the customer's own account",
      "Delivery-window reporting for the shop",
    ],
    tech: ["Next.js", "Postgres", "Razorpay", "GSAP", "Lenis", "TypeScript"],
    client: "Multi-brand apparel retailer",
    accent: ["#c93e1a", "#ff6a38"],
    image: "/media/work-fashion-delivery-store.jpg",
  },
  {
    slug: "mobile-store-website",
    name: "Mobile Store Website",
    category: "Commerce · Retail Tooling",
    label: "live",
    summary:
      "A seven-route smartphone store built around price, offers, EMI and exchange — and deliberately without a cart.",
    vision:
      "A buyer walks into a phone shop with one of four jobs: what does it cost, which offers stack, what is the monthly instalment, and what is my old phone worth. One scrolling page buries three of them under whichever you put first.",
    building: [
      "Seven routes — lobby, shop, offers, EMI, exchange, repairs, visit",
      "An EMI calculator and a trade-in valuator as first-class pages",
      "A shortlist that compares phones and ends in a WhatsApp message naming them",
      "One navigation config driving the header, mobile index, footer and sitemap",
    ],
    approach:
      "A shop that does not take payments online should not fake a checkout, so there is no cart — a cart ending in 'call us' teaches customers the site is a brochure. The palette was rebuilt from measurements rather than mood: we read the computed styles out of the live pages of the brands the client admired and found a near-white ground, zero border-radius on essentially every control, one type weight and a single saturated accent used twice on a homepage.",
    stage: "Live. Four tools, seven routes, no cart, and a rebrand surface of four files.",
    next: [
      "Live stock from the counter",
      "Exchange quotes that hold for a day",
      "Service-status lookup for repairs",
    ],
    tech: ["Next.js", "GSAP", "Lenis", "Tailwind", "TypeScript"],
    client: "Multi-brand phone retailer",
    accent: ["#d0441a", "#fa5b1f"],
    image: "/media/work-mobile-store-website.jpg",
  },
  {
    slug: "property-advisory-website",
    name: "Property Advisory Website",
    category: "Property · Multi-page Site",
    label: "live",
    summary:
      "A property advisory site for Vrindavan and Mathura, and the reference build every later client site was cloned from.",
    vision:
      "Property advisory in a temple town runs on trust, and most agency sites actively spend it — stock photography, invented statistics, and a promise that could belong to any firm in any city.",
    building: [
      "A nine-item navigation with a measured breakpoint, and a drawer below it",
      "Listings, localities, services and advisory pages",
      "Contact channels that retreat when the footer is in view",
      "A promise triad carried through every page",
    ],
    approach:
      "Entrances above the fold use plain CSS keyframes and never an observer, because a throttled IntersectionObserver once left an entire hero invisible on load. Scroll reveals below the fold are gated behind a scripting media query, so a no-JS render still shows every word. The desktop navigation breaks at 1240px rather than at a round number, because nine single-line labels need roughly 1225px.",
    stage: "Live, and frozen at v1.0 as the reference implementation for the client sites that followed.",
    next: [
      "Listings managed by the client rather than by us",
      "Enquiries routed to a real inbox",
      "Photography licensed for publication",
    ],
    tech: ["Next.js", "React", "Tailwind", "Vercel"],
    client: "Property advisory firm",
    accent: ["#c89653", "#0c243c"],
    image: "/media/work-property-advisory-website.jpg",
  },
  {
    slug: "property-agency-website",
    name: "Property Agency Website",
    category: "Property · Rebrand",
    label: "live",
    summary:
      "A women-led agency site, with a palette re-derived from their own logo once the artwork arrived.",
    vision:
      "Every agency in the district needs the same site and none of them can pay for one to be designed from nothing. The economics only work if the second build costs a fraction of the first — without the second client receiving a visibly recycled version of it.",
    building: [
      "A palette measured off the supplied artwork, not guessed",
      "A two-file logo system for light and dark surfaces",
      "The full agency site — listings, localities, services, contact",
    ],
    approach:
      "The client's charcoal sat within a few points of the site's dark ground, so on the footer the buildings in their mark vanished entirely; the second logo file lifts the darkest pixels to a warm cream and leaves the gold alone. Contrast is arithmetic here, not taste: white on their gold is 2.12:1, ink on the same gold is 8.43:1, so gold fills always take ink text.",
    stage: "Live. The first client whose real logo arrived after the palette was chosen, which is now the expected order.",
    next: [
      "Their own inventory in place of the reference listings",
      "Consented testimonials",
      "A confirmed canonical phone number and address",
    ],
    tech: ["Next.js", "React", "Tailwind", "Netlify"],
    client: "Women-led property agency",
    accent: ["#daaa66", "#151a1f"],
    image: "/media/work-property-agency-website.jpg",
  },
  {
    slug: "property-consultancy-website",
    name: "Property Consultancy Website",
    category: "Client Site · Advisory",
    label: "live",
    summary:
      "A consultancy site built on the same rebrandable core as the two agency sites, proving the architecture holds when the business model underneath it changes.",
    vision:
      "The third property business in a row wanted a site, and wanted it to look nothing like the other two. That is the real test of a rebrandable system: not whether it can be recoloured, but whether an advisory practice selling judgement can use the same skeleton as an agency selling listings without either looking borrowed.",
    building: [
      "The full site — services, credentials, process, enquiry",
      "Palette, type and copy derived from the practice, not swapped from a preset",
      "Enquiry routed to WhatsApp with the service and context already written in",
      "Structured data so the practice appears correctly in local search",
      "Measured contrast on every text colour, on both grounds",
    ],
    approach:
      "Everything that changes between clients lives in four files and nothing in the component layer, which is what makes the third build days rather than weeks. The discipline is refusing to let a client-specific decision leak into a shared component — the moment one does, every future rebrand inherits it and the system quietly stops being a system.",
    stage: "Live.",
    next: [
      "A case-note format the practice can publish itself",
      "Bilingual copy for the same audience",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Structured data"],
    client: "Property consultancy",
    accent: ["#8fb3d9", "#567cb3"],
    image: "/media/work-property-consultancy-website.jpg",
  },
  {
    slug: "digital-studio-website",
    name: "The Studio's Own Site",
    category: "Own Site · Immersive",
    label: "live",
    summary:
      "This site. Inertia scroll, an eight-pillar service architecture, per-service pages and a work rail — the studio's own argument, made in the medium it sells.",
    vision:
      "An agency site that looks like every other agency site is an argument against itself. If the pitch is that we build things people remember, the site has to be the first proof, and it has to survive the scrutiny of the people most likely to check — other developers.",
    building: [
      "Inertia scrolling, a cursor-tracked preview layer and page transitions",
      "Eight service pillars, each with its own page and deliverable set",
      "A work rail carrying the delivered projects and the research shelf",
      "A media manifest that content-stamps every asset so a replaced file busts its own cache",
      "Motion tuned separately for phones, where most of the traffic is",
    ],
    approach:
      "Motion is the first thing to become decoration, so every effect has to justify itself against speed and accessibility or it is cut — several were. The reveal animations were rebuilt on opacity after clip-path reveals turned out to leave elements invisible on mobile, which is the kind of bug that only shows up on a real phone and costs you every visitor on one.",
    stage: "Live, and continuously rebuilt.",
    next: [
      "Per-service case evidence pulled from the work entries",
      "A written argument for each pillar, not just a deliverable list",
    ],
    tech: ["Next.js", "GSAP", "Lenis", "Tailwind", "TypeScript"],
    client: "ZeizzLabs",
    accent: ["#dcb877", "#c9a15c"],
    image: "/media/work-digital-studio-website.jpg",
  },
  {
    slug: "dental-practice-website",
    name: "Dental Practice Website",
    category: "Client Site · Healthcare",
    label: "live",
    summary:
      "A clinic site where the whole job is answering, above the fold, the three questions a nervous patient actually has: what does it cost, will it hurt, and can I be seen this week.",
    vision:
      "Healthcare sites default to stock photography of people who have never been anxious about a dentist. The patient arriving on the page is usually in some discomfort and looking for one of three things — a price, reassurance, or an appointment — and everything else on the page is in the way of those.",
    building: [
      "Treatments with indicative pricing rather than 'contact us for a quote'",
      "Appointment enquiry that reaches the practice on WhatsApp, complete",
      "Practitioner credentials placed where a patient decides whether to trust",
      "Local structured data, because a clinic search is a map search",
      "Accessibility and contrast checked, not assumed",
    ],
    approach:
      "Publishing an indicative price is the decision most clinics resist and the one that converts, because the patient comparing three practices will discard the two that will not tell them. The site is built to be honest above the fold and detailed below it.",
    stage: "Live.",
    next: ["Online slot booking against the real diary", "Post-treatment care pages"],
    tech: ["Next.js", "TypeScript", "Tailwind", "Structured data"],
    client: "Dental practice",
    accent: ["#7fc4bb", "#2fa8a0"],
    image: "/media/work-dental-practice-website.jpg",
  },
  {
    slug: "restaurant-website",
    name: "Restaurant Website",
    category: "Template · Sit-down Dining",
    label: "shipped",
    summary:
      "The donor architecture for the whole template family — one page, one content file as the entire rebrand surface, and photography that degrades to a designed wash rather than a broken icon.",
    vision:
      "A restaurant that has just opened has no photographs yet, and waiting for a shoot is the usual reason a site never launches at all. So the first question was not how the site looks with pictures, but whether it is still worth publishing without them.",
    building: [
      "A reservation-led single page for a sit-down restaurant",
      "One content module carrying every word, price and link",
      "Missing photography degrading to a designed wash in the brand palette",
      "Menu, story, gallery, events and visit sections",
    ],
    approach:
      "Everything a client changes lives in four files and nothing in the component layer. That constraint is what makes the second restaurant a matter of days, and it only holds if you refuse to let a client-specific decision leak into a shared component — the first time one does, every future rebrand inherits it.",
    stage:
      "Shipped, and the donor for five further verticals.",
    next: [
      "Multi-location support",
      "Online ordering as an optional module",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    client: "Template — for licence",
    accent: ["#d99a76", "#c55e33"],
    image: "/media/work-restaurant-website.jpg",
  },
  {
    slug: "fast-food-ordering-website",
    name: "Fast-Food Ordering Website",
    category: "Template · Quick Service",
    label: "shipped",
    summary:
      "The ordering half of the restaurant problem: a persistent cart, category tabs, veg and spice filters, a combo builder, coupon codes and a sticky bar that becomes the running order total.",
    vision:
      "A sit-down restaurant sells a reservation; a fast-food brand sells the order itself. Same industry, opposite site — which made it the right test of whether the donor architecture could bend that far without being rewritten.",
    building: [
      "A persistent cart and a sticky mobile bar showing the live total",
      "Category tabs plus vegetarian and spice filters",
      "A combo builder and coupon codes",
      "Checkout posting to one route, then handing off to the client's POS",
      "Seven palette presets, from fried chicken to bubble tea",
    ],
    approach:
      "Checkout deliberately stops at a single route rather than integrating a payment provider, because every quick-service client already has a POS or an aggregator and the one thing they will not do is change it. The template's job is to reach that boundary cleanly and stop.",
    stage:
      "Shipped.",
    next: [
      "Direct aggregator integrations",
      "Live order status for the customer",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    client: "Template — for licence",
    accent: ["#f08a7a", "#e0451d"],
    image: "/media/work-fast-food-ordering-website.jpg",
  },
  {
    slug: "salon-spa-website",
    name: "Salon & Spa Website",
    category: "Template · Appointments",
    label: "shipped",
    summary:
      "The first service-appointment vertical, and where the rule that services and prices come before any call to action was settled.",
    vision:
      "Salon sites hide the price list behind an enquiry form, and the customer comparing three salons simply discards the two that will not tell them. Putting prices second on the page is a commercial decision disguised as a layout one.",
    building: [
      "Services and prices as section two, above every call to action",
      "Service rows that pre-fill the booking form when picked",
      "A dependency-free immersion layer with no animation runtime at all",
      "Eucalyptus, bone and brass, chosen against the stock spa palette",
    ],
    approach:
      "The motion here uses no animation library at all — the whole immersion layer is CSS and a few observers. A salon site is opened on a mid-range phone between appointments, and a runtime that costs a second of load is a worse trade than any effect it buys.",
    stage:
      "Shipped.",
    next: [
      "Stylist-level availability",
      "Membership and package handling",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    client: "Template — for licence",
    accent: ["#c8b08a", "#7e6425"],
    image: "/media/work-salon-spa-website.jpg",
  },
  {
    slug: "cafe-roastery-website",
    name: "Cafe & Roastery Website",
    category: "Template · Cafe & Retail",
    label: "shipped",
    summary:
      "The first light-ground template in the family, with an order tray and a brew guide that is a real, working timer.",
    vision:
      "Every template so far had been dark, and dark had started to be a habit rather than a decision. A roastery sells paper bags, kraft and cream — the palette had to invert, and inverting it exposed which parts of the system had quietly assumed a dark ground.",
    building: [
      "The first light-ground template — cream is the page, not an accent",
      "An order tray persisted locally, and a separate reservation path",
      "A brew guide that is a real timer, safe against a backgrounded tab",
      "A palette splitting fill from text, because one accent cannot do both",
    ],
    approach:
      "The brew timer is the detail that matters: a timer driven by an interval drifts badly once the tab is backgrounded, which is exactly what happens when someone starts it and puts the phone down. It reads wall-clock time on wake instead, so it is still correct four minutes later.",
    stage:
      "Shipped, and the source of the fill-versus-text accent rule the later templates inherit.",
    next: [
      "Subscription coffee",
      "Wholesale ordering for cafes",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    client: "Template — for licence",
    accent: ["#c99a63", "#865b21"],
    image: "/media/work-cafe-roastery-website.jpg",
  },
  {
    slug: "property-developer-website",
    name: "Property Developer Website",
    category: "Template · Developers",
    label: "shipped",
    summary:
      "The property-developer vertical, and the first template carrying real tooling rather than only content — an EMI calculator, a construction-progress tracker, and a registration number on every card.",
    vision:
      "A developer sells something that does not exist yet, so the site has to answer two questions an agency site never faces: can I afford it, and will it actually be finished. Neither is answered by photography.",
    building: [
      "An EMI calculator and a construction-progress tracker",
      "Registration numbers on every project card",
      "Status never carried by colour alone — each state has its own token and label",
      "Every number, area and price set in tabular mono",
    ],
    approach:
      "Status is never colour alone. A buyer scanning phases needs to read 'ready to move' rather than infer it from green, and a colour-blind buyer needs the same information the rest get — so every state carries a label as well as a token.",
    stage:
      "Shipped.",
    next: [
      "Unit-level availability and floor plates",
      "Buyer document lockers",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    client: "Template — for licence",
    accent: ["#8fb3d9", "#34517a"],
    image: "/media/work-property-developer-website.jpg",
  },
  {
    slug: "hotel-website",
    name: "Hotel Website",
    category: "Client Site · Hospitality",
    label: "in-development",
    summary:
      "A nine-route site for an independent hotel — rooms, dining, a full menu, events, pool and bookings — and the one project in the set where WebGL earned its place.",
    vision:
      "A hotel site is judged in the first two seconds against the photograph the guest has already seen on a booking aggregator. If it does not feel more expensive than the aggregator listing, the guest books there instead and the hotel pays the commission on a booking it could have taken directly. Everything on the page is in service of that one comparison.",
    building: [
      "Nine routes, including a full dining menu and a direct bookings flow",
      "Three-dimensional scenes on selected routes, where depth carries the luxury read",
      "Scroll-scrubbed timelines rather than fade-in-on-scroll",
      "A two-colour palette — midnight and champagne — held across the whole site",
      "A downloadable menu and an events enquiry path",
    ],
    approach:
      "WebGL is on a handful of routes and nowhere else. A three-dimensional scene is expensive on exactly the mid-range phone a guest is browsing from in bed, so it has to change the decision to be worth the cost — on the pool and the grounds it does, because depth is what those rooms are selling. On the booking form it would only slow the thing the hotel is paid for.",
    stage:
      "In development. The build is live at a staging URL while rooms, rates and the booking path are still being finished.",
    next: [
      "Live availability and rates against the property management system",
      "Direct booking with payment, so the commission stops being paid",
      "A second language for the inbound pilgrimage season",
    ],
    tech: ["Next.js", "React Three Fiber", "GSAP", "Lenis", "Tailwind", "TypeScript"],
    client: "Independent hotel",
    accent: ["#e3c98d", "#c4a253"],
    image: "/media/work-hotel-website.jpg",
  },
  {
    slug: "travel-booking-website",
    name: "Travel & Yatra Booking Website",
    category: "Client Site · Travel",
    label: "live",
    summary:
      "A three-page travel site for pilgrimage and adventure booking, built as static HTML with no build step, no dependencies and no backend.",
    vision:
      "The customer for a Char Dham yatra is often on a hill connection, on an older phone, and deciding quickly. Every kilobyte and every dependency is a tax on someone in exactly the moment they are ready to book.",
    building: [
      "Three pages covering pilgrimage packages and adventure booking",
      "A booking sheet composing a structured message and handing off",
      "Static HTML with no build step, no dependencies and no backend",
      "Motion on transform and opacity only, for mid-range phones",
    ],
    approach:
      "Choosing no framework at all was the design decision, not a shortcut. There is nothing to hydrate, nothing to wait for and nothing to break on a weak connection — and the operator can edit a page without a toolchain, which is the difference between a site that stays current and one that does not.",
    stage:
      "Live.",
    next: [
      "Seat availability against real departures",
      "Hindi throughout",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    client: "Pilgrimage tour operator",
    accent: ["#7fc4bb", "#1c6b66"],
    image: "/media/work-travel-booking-website.jpg",
  },
  {
    slug: "the-evidence-log",
    name: "The Evidence Log",
    category: "Own Product · Published",
    label: "shipped",
    summary:
      "A documentation system for people who need a clear, timestamped record of events, dates and documents — sold direct as a one-time purchase.",
    vision:
      "People who need a record usually need it because something has gone wrong, and they are assembling it under stress, late, from memory. The product's whole job is to make the structure obvious enough that a person in that state can still use it correctly.",
    building: [
      "A timestamped entry log with file and audio attachments",
      "Tagging, records and exportable reports",
      "The record is a file the buyer owns outright",
      "Sold once at $26, not subscribed",
    ],
    approach:
      "Priced once rather than subscribed. A recurring charge on a record someone may need to keep for years is a way of losing the customer twice — and the buyer is purchasing a finished thing, not a service.",
    stage:
      "Published and selling.",
    next: [
      "A guided first-entry walkthrough",
      "A companion for shared records",
    ],
    tech: ["Product design", "Editorial", "Listing photography", "Etsy"],
    client: "StudiedSystems",
    accent: ["#d99a76", "#8e3f1e"],
    image: "/media/work-the-evidence-log.jpg",
  },
  {
    slug: "the-application-kit",
    name: "The Application Kit",
    category: "Own Product · Published",
    label: "shipped",
    summary:
      "A document checklist, deadline timeline and status dashboard for anyone running several applications at once, with sample documents so the first entry takes minutes.",
    vision:
      "Running six applications at once is not hard because any one of them is hard. It is hard because the deadlines, documents and states live in six different places, and the one that slips is always the one nobody was looking at.",
    building: [
      "A per-application document checklist with three states",
      "A timeline view with reminders before dates pass",
      "A dashboard sorting open, in-progress and submitted",
      "Sample documents, so the first entry takes minutes",
    ],
    approach:
      "The worked sample is the manual. A blank template asks the buyer to invent a structure before they can use it, which is where most of them stop — so the kit arrives with one application already filled in.",
    stage:
      "Published and selling at $22.",
    next: [
      "Regional presets for common application types",
      "A shared view for a family or advisor",
    ],
    tech: ["Product design", "Editorial", "Listing photography", "Etsy"],
    client: "StudiedSystems",
    accent: ["#d99a76", "#8e3f1e"],
    image: "/media/work-the-application-kit.jpg",
  },
  {
    slug: "tell-it-back",
    name: "Tell It Back",
    category: "Own Product · Published",
    label: "shipped",
    summary:
      "A homeschool narration companion — 88 prompts sorted by age and subject, the four rules that make the method work, and the original source text behind it.",
    vision:
      "Narration is a teaching method people adopt from a summary and then abandon, because the summary leaves out the four rules that make it work at all. Most products in this space sell prompts and skip the method.",
    building: [
      "88 prompts organised by age and subject",
      "The four rules that make the method work, stated first",
      "A section built around the four common failures",
      "The original source text, and printable cards",
    ],
    approach:
      "Leading with the failure modes rather than the promise is the unusual choice. A parent who knows the four ways this goes wrong will keep going when it does; one sold only on the benefit stops the first week it is awkward.",
    stage:
      "Published and selling at $18.",
    next: [
      "Subject-specific packs",
      "A version for classroom groups",
    ],
    tech: ["Product design", "Editorial", "Research", "Etsy"],
    client: "StudiedSystems",
    accent: ["#d99a76", "#8e3f1e"],
    image: "/media/work-tell-it-back.jpg",
  },
  {
    slug: "engineering-workbooks",
    name: "Engineering Spreadsheets",
    category: "Own Product · Published",
    label: "shipped",
    summary:
      "Nine construction site workbooks across two regional editions, covering bar bending schedules, billing and measurement, labour compliance, delay control, cost estimation and payment protection.",
    vision:
      "Site paperwork is where money is actually lost — an unrecorded variation, a missed measurement, a delay nobody documented. The engineers who need these are not going to adopt software; they will open a spreadsheet, so the spreadsheet has to be right.",
    building: [
      "Nine workbooks across an India and a United States edition",
      "India: bar bending, billing, compliance, delay control, cost estimation",
      "United States: contractor estimator, payment protection, subcontractor compliance",
      "Every workbook shipping blank and worked, because the sample is the manual",
    ],
    approach:
      "Two regional editions rather than one generic set, because compliance is the entire value and a generic labour-compliance sheet is worse than none — it gives false confidence in exactly the document an audit will examine.",
    stage:
      "Published.",
    next: [
      "More trades per edition",
      "A guided video per workbook",
    ],
    tech: ["Excel", "Domain modelling", "Technical writing", "Video"],
    client: "Own product",
    accent: ["#dcb877", "#865b21"],
    image: "/media/work-engineering-workbooks.jpg",
  },
  {
    slug: "kawaii-little-worlds",
    name: "Kawaii Little Worlds",
    category: "Own Product · Published",
    label: "shipped",
    summary:
      "A children's colouring series published to Amazon KDP — 6x9, 46 pages, print-ready interior and cover, with the AI-content disclosure answered honestly.",
    vision:
      "Publishing to a print platform is a production problem, not a creative one. Bleed, trim, spine width and colour space decide whether the book is accepted, and none of that is visible on screen until it is rejected.",
    building: [
      "Print-ready 6x9 interior and wrap cover, produced to the platform's spec",
      "Four story beats followed by a 25-plate gallery",
      "A formal copyright page and fill-in activity pages",
      "The AI-content disclosure answered honestly at upload",
      "A second title on the same production pipeline",
    ],
    approach:
      "The disclosure was answered honestly, which is the only defensible choice and also the practical one — a platform that later determines otherwise removes the listing, and the whole catalogue with it. The pipeline is built so the second title cost a fraction of the first.",
    stage:
      "Published on Amazon KDP, two titles.",
    next: [
      "More titles on the same pipeline",
      "A paperback bundle",
    ],
    tech: ["Art direction", "Typesetting", "PDF production", "Amazon KDP"],
    client: "Self-published — Amazon KDP",
    accent: ["#b39ddb", "#4e3e7d"],
    image: "/media/work-kawaii-little-worlds.jpg",
  },
  {
    slug: "voice-reception",
    name: "Vox",
    category: "AI Calling Agent · Voice",
    label: "in-development",
    summary:
      "A voice agent meant to answer the calls a small business misses — and to sound like a person while doing it.",
    vision:
      "A clinic, a salon or a workshop loses work every week to a phone nobody could reach. The caller does not leave a voicemail; they ring the next name on the list. Vox is our attempt at the smallest thing that fixes that: something that picks up on the first ring, knows the opening hours and the price list, and can put an appointment in the calendar without a human in the loop. The bar we set is not 'impressive for AI' — it is that the caller should not feel they were fobbed off.",
    building: [
      "Sub-second turn-taking, so it does not feel like a phone tree",
      "A knowledge layer fed from the business's own prices and policies",
      "Calendar booking with a real confirmation back to the caller",
      "Clean handoff to a human the moment it is out of its depth",
      "A transcript of every call, readable the next morning",
    ],
    approach:
      "Streaming speech in and out rather than record-then-respond, because latency is what makes these things feel robotic. The agent is deliberately narrow: it answers from a small, verified set of facts and refuses anything outside it, instead of improvising. Everything it schedules is written to the real calendar, not to a mock.",
    stage:
      "Working on a live number in the studio. Turn-taking and booking hold up in ordinary conversation; accents, background noise and people talking over it are where it still falls down.",
    next: [
      "Hardening against noisy environments and interruptions",
      "Multi-language handling for Hindi and English in one call",
      "A dashboard for reading calls and correcting mistakes",
    ],
    tech: ["Twilio", "Realtime Voice", "Calendar API", "Node"],
    accent: ["#1e7bff", "#4da3ff"],
    image: "/media/work-voice-reception.jpg",
  },
  {
    slug: "whatsapp-desk",
    name: "Relay",
    category: "Automation · Messaging",
    label: "prototype",
    summary:
      "One queue for every enquiry, wherever it arrives — and an answer before the person gets bored.",
    vision:
      "Enquiries turn up on WhatsApp, on Instagram, through the website form, and sometimes by SMS. They sit in four different inboxes owned by three different people, and the fastest of them is checked twice a day. Relay is the idea that all of it should land in one place, get an instant acknowledgement that is actually useful, and only involve a human when a human is needed.",
    building: [
      "A single queue fed by WhatsApp, web forms and social DMs",
      "Instant, context-aware first replies rather than an autoresponder",
      "Routing rules by topic, so the right person sees it",
      "Two-way CRM sync, so the record is never in only one place",
      "Escalation when a thread goes quiet or turns sour",
    ],
    approach:
      "Channel adapters normalise every message into one shape, so adding a channel later does not mean rewriting the logic. Replies are drafted against the business's own catalogue and policies and are deliberately short — the goal is to hold attention until a person arrives, not to fake a full conversation.",
    stage:
      "Prototype. WhatsApp and web-form intake work end to end with sub-five-second first replies. Instagram is not wired yet, and the routing rules are still hand-written rather than configurable.",
    next: [
      "Instagram and Messenger intake",
      "A rules editor, so routing does not need a developer",
      "Reporting on response time and drop-off",
    ],
    tech: ["WhatsApp Cloud API", "Queues", "Webhooks", "CRM sync"],
    accent: ["#4da3ff", "#dcb877"],
    image: "/media/work-whatsapp-desk.jpg",
  },
  {
    slug: "helios-dashboard",
    name: "Helios",
    category: "Web App · Analytics",
    label: "concept",
    summary:
      "An analytics view that answers business questions instead of showing charts.",
    vision:
      "Most small businesses have analytics installed and have never once acted on it, because the tools answer questions nobody asked. Helios starts from the other end: three or four questions an owner genuinely has — where did this month's enquiries come from, what is quietly getting worse, what should I do on Monday — and works backwards to the smallest interface that answers them.",
    building: [
      "A single decision view rather than a wall of charts",
      "Plain-language summaries of what changed and why it matters",
      "Source attribution that survives people arriving from WhatsApp",
      "Alerts on meaningful movement, not on noise",
    ],
    approach:
      "Events are collapsed into a handful of business-level facts at write time, so queries stay fast and the surface stays small. The design constraint is that every number on screen has to be one you could act on; anything that is merely interesting gets cut.",
    stage:
      "Concept with a working query layer. Sub-second aggregates over a million synthetic events; the interface is still wireframes and the plain-language summaries are hand-written, not generated.",
    next: [
      "Turning the wireframes into a real interface",
      "Generating the summaries from the underlying movement",
      "Testing it against a real business's data rather than synthetic",
    ],
    tech: ["Next.js", "Edge Functions", "SQL", "Charts"],
    accent: ["#dcb877", "#ecd3a0"],
    image: "/media/work-helios-dashboard.jpg",
  },
  {
    slug: "aria-agent",
    name: "Aria",
    category: "AI · Knowledge Agent",
    label: "research",
    summary:
      "An assistant that answers only from your documents, and shows its working.",
    vision:
      "General-purpose chatbots are confidently wrong about specific businesses, which is worse than useless when the answer is a price or a policy. Aria is a narrower bet: read only what you gave it, cite the passage it used, and say plainly when the documents do not cover the question. The interesting part is not the answering — it is the refusing.",
    building: [
      "Retrieval over the business's own documents and catalogue",
      "Answers with the source passage attached",
      "An explicit 'not covered' response instead of a guess",
      "A drafting mode where a human approves before anything is sent",
      "Embeddable on the site and inside WhatsApp",
    ],
    approach:
      "Retrieval first, generation second, and a hard rule that anything unsupported by a retrieved passage is not answered. We are more interested in the failure behaviour than the success rate: an assistant that is right 95% of the time and silently wrong the rest is not deployable for a business whose prices are on the line.",
    stage:
      "Research. Grounded, cited drafts work on a small document set. Retrieval quality falls off on long or badly structured documents, and it is not yet reliable enough to answer a customer without review.",
    next: [
      "Better chunking for long and poorly structured documents",
      "Measuring the refusal rate as carefully as the answer rate",
      "A review queue before anything reaches a customer",
    ],
    tech: ["LLM", "RAG", "Vector DB", "TypeScript"],
    accent: ["#a4b3c9", "#4da3ff"],
    image: "/media/work-aria-agent.jpg",
  },
];

/** Human-readable stage labels. Title case — these are shown as-is. */
export const workLabels: Record<Project["label"], string> = {
  live: "Live",
  shipped: "Shipped",
  concept: "Concept",
  "in-development": "In development",
  prototype: "Prototype",
  research: "Research",
};
