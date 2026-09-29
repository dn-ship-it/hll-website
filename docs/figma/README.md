# HLL Figma — Desktop inventory

Source: file `4aTBww339Nxg5OsyvRR5Y2`, page **Final** (`1068:4146`), section **Desktop** (`1302:11316`). Fetched 2026-09-29 (read-only).
Raw layer tree: `desktop-metadata.xml` (1964 nodes, 731 text layers — text layer names = copy).

## Screens (1512px wide)
| Screen | Node | Height |
|---|---|---|
| Home | `1068:4160` | 11221 |
| Engagement Main | `1068:4392` | 3480 |
| Engagement Filter Expanded | `1341:20475` | 3480 |
| Case Study Template | `1068:4964` | 6943 |
| Engagement Story Template | `1192:8048` | 5748 |
| Services | `1277:8656` | 8810 |
| Industry | `1277:8984` | 7689 |
| About_01 | `1277:9467` | 7535 |
| About_02 | `1302:11558` | 7535 |
| Footer | `1341:23164` | 980 |
| Team | `1098:5219` | 7045 |
| JD | `1116:7340` | 4426 |
| Careers | `1116:7183` | 7705 |
| Contact | `1341:11841` | 4341 |

## Design tokens (Figma variables)
| Token | Value |
|---|---|
| Background | `#FAFAFA` |
| Dark Grey | `#1A1A1A` |
| Mid Grey | `#949494` |
| Light Grey | `#E6E6E6` |
| H1 | Aeonik TRIAL Light 300, 64px, line-height 100% |
| Title Regular | Aeonik TRIAL Regular 400, 36px, 100% |
| Title Medium | Aeonik TRIAL Medium 500, 36px, 100% |
| Paragraph Large | Aeonik TRIAL Regular, 24px, line-height 1.25 |
| Paragraph | Aeonik TRIAL Regular, 20px, line-height 1.25 |
| Button / Case Study Section | Aeonik TRIAL Regular, 12px, 100%, letter-spacing 25 (=0.25em) |
| Functional | Sometype Mono Regular, 12px, 100% |

Service colours, icons and images are extracted into `src/components/marketing/services/service-theme.ts` and `public/assets/services/`.

## Designer annotations (by nearest screen)

### General
- PLEASE see BEFORE READing COMMENTS
- What type of content goes into a block
- Interactions/extra details
- statement headers (Main Header) uses text sweep (a slower animation). we’ll refer to it as slow anim.
- other headers (section headers) uses text Leaks (a faster animation). we’ll refer to it as Fast anim.
- simple fade up animation For which we can use the fade up from Aos (animate on scroll) library. this will be used on text and assets we’ll refer to it as fade up.
- Number counter animation a number counter (0 to target), paired with a simple fade up in the subtext. we’ll refer to it as number counter.
- window starts at given ratio with video playing and then smoothly scales to viewport width and height to cover the entire screen, video continues playing.

### Home
- On scroll the services change shifting through the list of names as you scroll. the content and icon opposite to it changes accordingly as well
- THe “our promise” section is a custom scroll interaction which has been provided. In this the first state is the text state as you can see upon scrolling there will be a knowledge graph (made by hannan) according to the attached reference (https://www.synapserstudio.com/) and replace the current placeholder image. The nodes of the map will be the industries served. if user clicks on a specific industry, it moves the user to that page
- See our work button is within the video card, takes user to engagements
- marquee runner displaying the clients logos (PNG or webp images)
- Media blocks media blocks can have either videos, gifs, or photos
- Media grid a customizable grid of media blocks providing flexibility in cms
- Images it can only have images in it
- Videos it can only have videos in it
- Demo windows a window with an interactive artifact made by the HLL team in accordance to a specific service.
- every page has a shader overlay which stays bottom aligned but has a different state upon reaching the footer, where it changes slightly to become vibrant. The shader also covers the screen upon interacting with or clicking on any options in the navbar. This behaviour will only be described in the first page but is applied everywhere
- Horizontal lines in the website are to be animated to appear gracefully from left to right when in screen.
- Each case study card has client name, tagging of services provided, and an image
- View All work button will be sticky and leads to the engagements page
- the content and icon here changes along with the scroll as well
- let’s start a conversation above will have a video playing as its background which plays when write to us is hovered on.
- The shader overlay shifts variant and livens up at the footer region.
- Dynamic custom layout: mainly follows a 3 column grid, but elements can be put in focus and made bigger (see zelish). ratio of cards depends on image ratio

### Engagement Main
- Filter button will be sticky to the bottom, with an expanded view
- Footer, shader, and navbar will continue to follow their behaviour here as well
- See left for expanded view >

### Engagement Filter Expanded
- this section remains sticky throughout the entire page, the artifact only shows up when the supporting section comes up
- colourS of THE PAGE will be PRIMARY COLOR OF THE CLIENT/CASE STUDY

### Case Study Template
- This is a custom cms page that allows the user to switch content blocks around
- colour of subheading will be PRIMARY COLOR OF THE CLIENT/CASE STUDY
- Gradient is according to the service colour, all case studies in it will be of the same service
- MEDIA BLOCKS have a very slight fade up on appearing the first time
- colourS of THE PAGE will be PRIMARY COLOR OF THE CLIENT/CASE STUDY
- Simple text fade up (on all paragraphs)

### Engagement Story Template
- colourS of THE PAGE will be PRIMARY COLOR OF THE CLIENT/CASE STUDY
- This is a custom cms page that allows the user to switch content blocks around
- This section can be adapted to whatever the user needs. meaning it can be either a demo window, image/video, or text
- the CMS allows US to enter custom colour scheme or service/industry theme. The media block will be such that in case there is no image user can add a quote and supporting text with a textured background having the custom colour.
- colour of subheading will be PRIMARY COLOR OF THE CLIENT/CASE STUDY
- Gradient is based on the colours of this project

### Services
- carousel with timer delay and arrows to shift between testimonials. each testimonial will have two images: logo and the person’s image
- The services buttons on hover will have its own service colour that shows.
- colour of subheading will be the PRIMARY colour set to the service
- as you scroll it highlights according to the section you are in
- Pills need to be cms and the team should be able to add tools by uploading icon and name to add to this section
- Live centered ripple animation in the back according to the colours of the service
- Clicking on the button opens expanded view of services
- Live corner ripple animation in the back according to the colours of the service

### Industry
- carousel with timer delay and arrows to shift between testimonials. each testimonial will have two images: logo and the person’s image
- The Industries buttons on hover will have its own colour that shows.
- as you scroll it highlights according to the section you are in
- colour of Industry name will be a colour set to the industry
- Tags will have their colour according to the industry
- Clicking on the sticky button opens an expanded view of the industries page to switch between them
- Live corner ripple animation in the back according to the colours of the service not all industries will have this (will be based on what service the demo tool showcases)

### About_01
- Refer to our values story board to understand the interaction
- The map shows where projects are located. Clicking a project opens its case study. 2 projects are always shown with the redirect-link state. Other projects start as a + icon and expand to the redirect-link state on hover. CMS fields: Project location, title, and case study link.
- when in focus- video plays and body text fades up. when switched it goes to one of the out of focus pillars the video starts playing and the text comes in as well.

### About_02
- The map shows where projects are located. Clicking a project opens its case study. 2 projects are always shown with the redirect-link state. Other projects start as a + icon and expand to the redirect-link state on hover. CMS fields: Project location, title, and case study link.
- when in focus- video plays and body text fades up. when switched it goes to one of the out of focus pillars the video starts playing and the text comes in as well.
- Refer to our values story board to understand the interaction

### JD
- Apply button takes you to the email.
- Simple accordion design where plus sign opens the section and minus closes it. one always stays open on load

### Careers
- carousel with timer delay and arrows to shift between testimonials. each testimonial will have two images: logo and the person’s image
- see open roles is sticky and takes you to the open roles section.
- Clicking this leads you to the detailed view page of that specific role
