import type { Product } from '../tokens'

/** What the family says about one product. */
export interface ProductEntry {
  /** The product's name. It is always lower case, except Talogic. */
  name:    string
  /** One sentence on what the product does. */
  tagline: string
  /** How ready the product is. */
  stage:   'In use' | 'Preview' | 'Early' | 'Concept' | 'Company'
}

/** The products of the family, with the copy the website shows. */
export const PRODUCT_CATALOGUE: Readonly<Record<Product, ProductEntry>> = {
  talogic: { name: 'Talogic', tagline: 'Human focused automations.', stage: 'Company' },
  pargic:  { name: 'pargic', tagline: 'Turns websites and documents into clean, checked records on a schedule.', stage: 'In use' },
  daygic:  { name: 'daygic', tagline: 'A wearable that listens through the day and writes your summary and to-dos.', stage: 'Concept' },
  ingic:   { name: 'ingic', tagline: 'Checks a returned scan against the PDF you sent, field by field.', stage: 'Preview' },
  loregic: { name: 'loregic', tagline: 'Publishes repo Markdown to Confluence, Pages and wikis, with a plan first.', stage: 'Preview' },
  loomgic: { name: 'loomgic', tagline: 'Pulls speech, speakers, text and objects out of video and audio.', stage: 'Early' },
}
