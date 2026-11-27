import type { Product } from '../tokens'

/** What the family says about one product. */
export interface ProductEntry {
  /** The product's name. It is always lower case, except Talogic. */
  name:         string
  /** One sentence on what the product does. */
  tagline:      string
  /** How ready the product is. */
  stage:        'In use' | 'Preview' | 'Early' | 'Concept' | 'Company'
  /** The main colour of the logo symbol, exactly as the logo file has it. It is not the interface accent. */
  logoColor:    string
  /** Other colours in the logo symbol, as the logo file has them. */
  logoAccents?: readonly string[]
}

/** The products of the family, with the copy the website shows. */
export const PRODUCT_CATALOGUE: Readonly<Record<Product, ProductEntry>> = {
  talogic: { name: 'Talogic', tagline: 'Human focused automations.', stage: 'Company', logoColor: '#753edd' },
  pargic:  { name: 'pargic', tagline: 'Turns websites and documents into clean, checked records on a schedule.', stage: 'In use', logoColor: '#dd773e' },
  daygic:  { name: 'daygic', tagline: 'A wearable that listens through the day and writes your summary and to-dos.', stage: 'Concept', logoColor: '#c8902e', logoAccents: ['#9a6a1c'] },
  ingic:   { name: 'ingic', tagline: 'Checks a returned scan against the PDF you sent, field by field.', stage: 'Preview', logoColor: '#3e63dd', logoAccents: ['#e5484d', '#979797'] },
  loregic: { name: 'loregic', tagline: 'Publishes repo Markdown to Confluence, Pages and wikis, with a plan first.', stage: 'Preview', logoColor: '#30a46c' },
  loomgic: { name: 'loomgic', tagline: 'Pulls speech, speakers, text and objects out of video and audio.', stage: 'Early', logoColor: '#3e63dd', logoAccents: ['#e5484d', '#30a46c'] },
}
