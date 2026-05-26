export type CourseStream =
  | 'Engineering'
  | 'Management'
  | 'Commerce'
  | 'Arts'
  | 'Medical'
  | 'Design'
  | 'Law'
  | 'Science'

export type CollegeType =
  | 'Government'
  | 'Private'
  | 'Deemed'
  | 'Autonomous'

export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  createdAt: string
}

export interface Course {
  id: string
  name: string
  duration: number
  fees: number
  eligibility: string
  seats: number
  stream: CourseStream
}

export interface College {
  id: string
  name: string
  shortName: string

  location: {
    city: string
    state: string
    region: string
  }

  type: CollegeType

  streams: CourseStream[]

  ranking: {
    nirf?: number
    collegedunia: number
    indiaToday?: number
  }

  rating: number
  reviewCount: number

  accreditation: {
    body: string
    grade: string
  }

  fees: {
    min: number
    max: number
  }

  imageUrl: string
  logoUrl: string

  established: number

  totalStudents: number

  placementRate: number

  avgPackage: number

  topRecruiters: string[]

  facilities: string[]

  website: string

  isVerified: boolean

  overview: string

  courses: Course[]

  reviews: Review[]
}

export interface CollegeFilters {
  search: string
  streams: CourseStream[]
  type: CollegeType[]
  location: string[]
  feeRange: [number, number]
  rating: number

  sortBy:
    | 'ranking'
    | 'rating'
    | 'fees_low'
    | 'fees_high'
    | 'name'
}

export const DEFAULT_FILTERS: CollegeFilters = {
  search: '',
  streams: [],
  type: [],
  location: [],
  feeRange: [0, 50],
  rating: 0,
  sortBy: 'ranking',
}

export interface ApiResponse<T> {
  data: T
  total?: number
  page?: number
  success: boolean
}