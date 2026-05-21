export interface UserProfile {
  id: string
  username: string
  verified: boolean
  firstName: string
  lastName: string
  avatarUrls: AvatarUrls
  languageId: number
  languageIsoCode: string
  isAdmin: boolean
  followersCount: number
  likesCount: number
  postAs: boolean
  settings: UserSettings
  createdAt: string
  joiningYear: number
  bio: string
  country: string
  postsCount: number
}

export interface AvatarUrls {
  small: string
  medium: string
  large: string
}

export interface UserSettings {
  reflectionLanguages: any[]
  ayahLanguages: any[]
  showFollowFeaturedSuggestion: boolean
}