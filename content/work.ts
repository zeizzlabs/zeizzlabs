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
    link: { href: "https://www.nirmanshastra.in", label: "Visit nirmanshastra.in" },
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
    link: { href: "https://minebynine.netlify.app", label: "Visit the store" },
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
    link: { href: "https://sudip-enterprises.netlify.app", label: "Visit the store" },
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
    link: { href: "https://nirmanshastra-realty.vercel.app", label: "Visit NirmanShastra Realty" },
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
    slug: "notion-systems-shop",
    name: "Notion Systems",
    category: "Digital Products · Notion",
    label: "shipped",
    summary:
      "Fifteen Notion templates, each built around one profession's actual workflow rather than a generic dashboard with the labels changed.",
    vision:
      "Most Notion templates on sale are one database and a wall of empty views. They demo beautifully and are abandoned in a fortnight, because nobody designed for the day the enthusiasm runs out. Each of these starts from a real job — what a therapist bills for, what a wedding planner is chased about, what a freelancer forgets — and is built backwards from that.",
    building: [
      "Fifteen systems across business, creative, personal and family workflows",
      "Relations and rollups doing the arithmetic, so nothing is counted twice",
      "Views that answer one question each rather than showing everything",
      "Entry templates, so adding a record is seconds and needs no decisions",
      "Sample data in every system, because a blank template is where buyers stop",
    ],
    approach:
      "Selling to strangers is the discipline here. There is no onboarding call, so the structure has to be obvious in the first minute or the buyer refunds — which is a much harder bar than building for a team you can explain it to, and it has improved every client handover since.",
    stage:
      "Fifteen live on Etsy.",
    next: [
      "Vertical bundles for a whole practice",
      "A guided setup walkthrough per system",
    ],
    tech: ["Notion", "Relational design", "Product copy", "Etsy"],
    client: "StudiedSystems",
    accent: ["#b39ddb", "#4e3e7d"],
    link: { href: "https://studiedsystems.etsy.com", label: "Browse on Etsy" },
    catalogue: [
      {
        heading: "Business & client work",
        items: [
          "Freelancer Client CRM",
          "Virtual Assistant OS",
          "Photography CRM",
          "Real Estate Agent CRM",
          "Therapist Practice OS",
          "Teacher Planner OS",
          "Content Creator OS",
        ],
      },
      {
        heading: "Personal & planning",
        items: [
          "Second Brain OS (PARA)",
          "Life Planner OS",
          "Personal Finance OS",
          "ADHD Focus Planner",
        ],
      },
      {
        heading: "Home & family",
        items: [
          "Indian Wedding Planner",
          "Baby Planner",
          "New Homeowner",
          "Dog Care Planner",
        ],
      },
    ],
    image: "/media/work-notion-systems-shop.jpg",
  },
  {
    slug: "engineering-spreadsheets",
    name: "Engineering Spreadsheets",
    category: "Digital Products · Construction",
    label: "shipped",
    summary:
      "Ten construction and contractor Excel systems — estimating, billing, payroll, compliance and project controls — in Indian and United States editions.",
    vision:
      "Site paperwork is where the money actually goes missing: an unrecorded variation, a missed measurement, a delay nobody documented, a subcontractor whose insurance lapsed. The engineers who need this will not adopt software — they will open a spreadsheet — so the spreadsheet has to be right.",
    building: [
      "Estimating and job costing, with a BOQ bid calculator",
      "Billing to IS 1200 and CPWD, and a payment tracker with retainage and change orders",
      "Bar bending schedules with rebar cutting lengths, to IS 456 and IS 1786",
      "Labour payroll and compliance for Indian sites; COI expiry and enforcement letters for US ones",
      "Project controls with an EVM dashboard and a delay register",
      "A site documentation pack — RFI, procurement and test registers",
    ],
    approach:
      "Two regional editions rather than one generic set, because compliance is the entire value and a generic labour-compliance sheet is worse than none: it gives false confidence in exactly the document an audit will open first.",
    stage:
      "Ten live on Etsy, including a full contractor bundle.",
    next: [
      "More trades per edition",
      "A walkthrough video per workbook",
    ],
    tech: ["Excel", "Google Sheets", "IS codes", "CPWD", "Etsy"],
    client: "StudiedSystems",
    accent: ["#dcb877", "#865b21"],
    link: { href: "https://studiedsystems.etsy.com", label: "Browse on Etsy" },
    catalogue: [
      {
        heading: "Estimating & billing",
        items: [
          "Construction Cost Estimator (India BOQ)",
          "Contractor Estimate Template (bid, job costing)",
          "Construction Billing Spreadsheet (IS 1200, CPWD)",
          "Bar Bending Schedule (rebar cutting length)",
        ],
      },
      {
        heading: "Payment & compliance",
        items: [
          "Construction Payment Tracker (retainage, change orders, waivers)",
          "Construction Labour Payroll (India compliance)",
          "Subcontractor Insurance Tracker with enforcement letters",
        ],
      },
      {
        heading: "Controls & documentation",
        items: [
          "Construction Project Controls (EVM dashboard, delay register)",
          "Construction Site Documentation Pack (RFI, procurement, test registers)",
          "Contractor Bundle — estimating, payment and compliance together",
        ],
      },
    ],
    image: "/media/work-engineering-spreadsheets.jpg",
  },
  {
    slug: "school-workbooks",
    name: "School & Homeschool Workbooks",
    category: "Digital Products · Education",
    label: "shipped",
    summary:
      "A full maths curriculum for grades one to eight — 1,668 worksheets with answer keys — plus the record-keeping kit a homeschooling parent actually has to produce.",
    vision:
      "I have two children and could not find material that neither talked down to them nor buried them in joyless drilling. The second problem was worse: homeschooling parents are asked for attendance, hours and a transcript, and there is almost nothing decent for producing those.",
    building: [
      "Full-syllabus maths workbooks for every grade from one to eight",
      "1,668 worksheets in the complete bundle, every one with an answer key",
      "Grade bundles and a middle-school set, for buying a stage rather than a year",
      "Sixty-page printable practice packs per grade for lighter practice",
      "A portfolio record-keeping kit — attendance, hours and transcript",
      "A transcript template with course descriptions and a school profile, for college applications",
      "A narration guide of 88 living-books prompts",
    ],
    approach:
      "Diagram-heavy and answer-key complete, because the parent teaching it is usually not a maths teacher and the answer key is what makes the material usable at all. The record-keeping side exists because that is the part parents are actually anxious about.",
    stage:
      "Twenty-four titles live on Etsy.",
    next: [
      "English and reading on the same model",
      "Regional syllabus editions",
    ],
    tech: ["Curriculum design", "Typesetting", "PDF production", "Etsy"],
    client: "StudiedSystems",
    accent: ["#7fc4bb", "#1c6b66"],
    link: { href: "https://studiedsystems.etsy.com", label: "Browse on Etsy" },
    catalogue: [
      {
        heading: "Maths workbooks, grade by grade",
        items: [
          "1st through 8th Grade Math Workbooks",
          "8th Grade Pre-Algebra Workbook",
          "185 to 227 worksheets per grade, answer keys included",
        ],
      },
      {
        heading: "Bundles",
        items: [
          "Math Workbook Bundle, Grades 1-8 — 1,668 worksheets",
          "Elementary Bundle, Grades 1-5 — 1,037 worksheets",
          "Middle School Bundle, Grades 6-8 — 631 worksheets",
          "Grades 1-3 Bundle — 590 worksheets",
        ],
      },
      {
        heading: "Practice packs & homeschool records",
        items: [
          "60-page printable practice packs, grades 1-8",
          "Homeschool Portfolio Record Keeping Kit",
          "Homeschool Transcript Template",
          "Homeschool Narration Guide — 88 prompts",
        ],
      },
    ],
    image: "/media/work-school-workbooks.jpg",
  },
  {
    slug: "published-books",
    name: "Published Books",
    category: "Own Products · Amazon KDP",
    label: "shipped",
    summary:
      "Eleven titles on Amazon — six pilgrimage and temple guides across the Jyotirlingas, the Krishna-Radha temples and the Hanuman circuit, and five mandala and kawaii colouring books.",
    vision:
      "A pilgrim planning a Jyotirlinga circuit is working from blog posts that contradict each other on darshan timings and say nothing honest about the routes. The temple books exist to be the version that answers to something — real timings, real routes, and the origin stories told properly rather than summarised.",
    building: [
      "Twelve Flames — the Jyotirlingas, as a story volume and a practical guide",
      "Twelve Flutes — the Krishna-Radha temples, same pairing",
      "Hanuman — fifteen temples across three continents, story and guide",
      "Five colouring books: mandalas for anxiety, Tibetan and Hindu devotional, and a kawaii series",
      "Print-ready interiors and wrap covers produced to the platform's spec",
      "Kindle, paperback and hardcover editions where the format suits the book",
    ],
    approach:
      "Every title ships as a story volume and a practical guide rather than one book trying to be both, because the reader on a train wants timings and the reader at home wants the origin story, and a book that interleaves them serves neither. The AI-content disclosure is answered honestly at upload — the only defensible answer, and the practical one, since a platform that later decides otherwise removes the whole catalogue.",
    stage:
      "Eleven titles published.",
    next: [
      "More temple circuits on the same pairing",
      "Hindi editions of the practical guides",
    ],
    tech: ["Research", "Art direction", "Typesetting", "PDF production", "Amazon KDP"],
    client: "Self-published",
    accent: ["#e0a75e", "#8e3f1e"],
    link: { href: "https://www.amazon.com/s?k=Sudip+Jhawar&i=stripbooks", label: "See the books on Amazon" },
    catalogue: [
      {
        heading: "Pilgrimage & temple guides",
        items: [
          "Twelve Flames: The Story of the Twelve Jyotirlingas",
          "Twelve Flames: A Pilgrim's Practical Guide",
          "Twelve Flutes: The Sacred Origin Stories",
          "Twelve Flutes: The Pilgrim's Complete Guide",
          "Hanuman: The Story of Fifteen Temples",
          "HANUMAN: A Pilgrim's Practical Guide",
        ],
      },
      {
        heading: "Colouring books",
        items: [
          "Calm in Circles — mandalas with cute animals",
          "Circle Therapy — simple mandalas for calming anxiety",
          "Tibetan Buddhist Mandalas — 50 meditative mandalas",
          "Divine Hindu Mandalas — meditative mandalas",
          "Crystal Grove Adventure — a kawaii colouring journey",
        ],
      },
    ],
    image: "/media/work-published-books.jpg",
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
