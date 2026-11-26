# Essentia — Requirements

Static marketing website for **Essentia — The Salon Lounge** (premium unisex salon, Attapur).

## In scope

- Marketing pages: Home, About, Services index, dynamic service categories, Packages, Contact. Privacy policy is written but unpublished (`app/(site)/_privacy-policy`, no route, no links)
- Service and package showcase from the Essentia menu (no prices)
- Light and dark themes
- Brand data from root `brand.json`
- Eat Rrite marketing UI patterns (header, sections, motion)

## Out of scope

- Booking, payments, authentication, admin, database, APIs

## Hard rules

- Never display prices, price ranges or pricing tables
- Do not modify the Eat Rrite project
- Consume brand fields from `brand.json`
