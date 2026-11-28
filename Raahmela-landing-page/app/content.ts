import type { StaticImageData } from 'next/image'
import passu from '../public/assets/photos/passu-hunza.jpg'
import skardu from '../public/assets/photos/skardu-lake.jpg'
import lahore from '../public/assets/photos/wazir-khan-lahore.jpg'

export type Photo = {
  src: StaticImageData
  alt: string
  place: string
  credit: string
  license?: { name: string; url: string }
  position?: string
}

export const photos = {
  passu: {
    src: passu,
    alt: 'The jagged Passu Cones rising above the Hunza River valley, with “Welcome to Passu” spelled out in stones on the hillside',
    place: 'Passu Cones, Hunza',
    credit: 'Hasnain Ayaz / Unsplash',
    position: '62% 50%',
  },
  skardu: {
    src: skardu,
    alt: 'A turquoise mountain lake surrounded by steep, bare slopes near Skardu',
    place: 'Skardu, Gilgit-Baltistan',
    credit: 'Moez Mustafa / Unsplash',
    position: '55% 50%',
  },
  lahore: {
    src: lahore,
    alt: 'The tiled minarets and gateway of Wazir Khan Mosque in Lahore’s Walled City',
    place: 'Wazir Khan Mosque, Lahore',
    credit: 'Aymenrizwan, cropped',
    license: { name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' },
    position: '70% 50%',
  },
} satisfies Record<string, Photo>

/** Hero slideshow order. Passu/Hunza must stay first: it is the preloaded LCP image. */
export const heroSlides: Photo[] = [photos.passu, photos.skardu, photos.lahore]

export const destinations = [
  { name: 'Hunza', note: 'Autumn colours, Attabad Lake, Passu Cones', photo: photos.passu },
  { name: 'Skardu', note: 'Deosai plains, Shigar Fort, cold desert', photo: photos.skardu },
  { name: 'Lahore', note: 'Walled City, Wazir Khan Mosque, food streets', photo: photos.lahore },
]

export const principles = [
  { title: 'Agencies and independent agents', text: 'Registered travel agencies and independent agents who know the places you want to go.' },
  { title: 'One request, several plans', text: 'Describe your trip once. Local specialists reply with their own plans.' },
  { title: 'Price in PKR, with what’s included', text: 'Plans show the price, departure city, transport, hotel and meals, so you can compare them side by side.' },
  { title: 'You choose who to talk to', text: 'Ask questions, compare and decide in your own time. Nothing is booked until you agree.' },
]

export const steps = [
  { title: 'Join early access', text: 'Leave your email and we’ll let you know when the app opens.' },
  { title: 'Post your trip', text: 'Where, when, group size, where you’re leaving from and your budget.' },
  { title: 'Compare plans', text: 'Local agencies and independent agents reply with the price, transport, hotel and meals.' },
  { title: 'Chat and decide', text: 'Ask your questions, then go with the specialist you’re comfortable with.' },
]

export const faqs = [
  {
    q: 'What is Sairvan?',
    a: 'Sairvan is a new app for planning trips in Pakistan. You describe the trip you want, and local travel agencies and independent agents send you plans to compare.',
  },
  {
    q: 'Is the app available yet?',
    a: 'Not yet. We’re preparing for launch. Join early access and we’ll email you when it opens.',
  },
  {
    q: 'Do I pay through Sairvan or directly to the agency or agent?',
    a: 'We’re still deciding how payments will work. We’ll explain it clearly before the app opens, and before you’re asked to pay anyone.',
  },
  {
    q: 'How will you choose which agencies and agents can join?',
    a: 'We’re finalising our review process now. We’ll publish what we check before launch, rather than make promises we haven’t yet put into practice.',
  },
  {
    q: 'What happens if my plans change or something goes wrong?',
    a: 'Cancellation and refund terms will depend on how payments work, which we’re still deciding. We’ll publish our policies before launch.',
  },
  {
    q: 'I’m an independent agent without a company. Can I join?',
    a: 'Yes. Sairvan is for travel agencies and independent agents alike. Register your interest below; a business name is optional.',
  },
]
