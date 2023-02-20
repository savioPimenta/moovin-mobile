import Bed from '../../../assets/furniture/bed.svg'
import Chair from '../../../assets/furniture/chair.svg'
import Desk from '../../../assets/furniture/desk.svg'
import Pouch from '../../../assets/furniture/pouch.svg'
import Rack from '../../../assets/furniture/rack.svg'
import Seat from '../../../assets/furniture/seat.svg'
import SmallBed from '../../../assets/furniture/small-bed.svg'
import Wardrobe from '../../../assets/furniture/wardrobe.svg'

export const regionItems = [
  {
    value: '',
    label: 'None',
  },
  {
    value: 'dublin',
    label: 'Dublin',
  },
  {
    value: 'galway',
    label: 'Galway',
  },
  {
    value: 'cork',
    label: 'Cork',
  },
  {
    value: 'waterford',
    label: 'Waterford',
  },
]

export const orderByItems = [
  {
    value: 'desc',
    label: 'Date desc'
  },
  {
    value: 'asc',
    label: 'Date asc'
  }
]

export const servicesTypes = [
  {
    type: 1,
    label: 'Residential moving',
  },
  {
    type: 2,
    label: 'Furniture assembly',
  },
]

export interface FurnitureItemsProps {
  id?: number
  label?: string
  // eslint-disable-next-line no-undef
  icon?: JSX.Element
  time?: number
}

export const furnitureItems = [
  {
    id: 1,
    label: 'Bed',
    icon: <Bed />,
    time: 20,
  },
  {
    id: 2,
    label: 'Sofa',
    icon: <Chair />,
    time: 20,
  },
  {
    id: 3,
    label: 'Desk',
    icon: <Desk />,
    time: 20,
  },
  {
    id: 4,
    label: 'Table',
    icon: <Desk />,
    time: 20,
  },
  {
    id: 5,
    label: 'Wardrobe',
    icon: <Wardrobe />,
    time: 20,
  },
  {
    id: 6,
    label: 'Chair',
    icon: <Seat />,
    time: 20,
  },
  {
    id: 7,
    label: 'Nightstand',
    icon: <SmallBed />,
    time: 20,
  },
  {
    id: 8,
    label: 'Armchair',
    icon: <Pouch />,
    time: 20,
  },
  {
    id: 9,
    label: 'Rack',
    icon: <Rack />,
    time: 20,
  },
]
