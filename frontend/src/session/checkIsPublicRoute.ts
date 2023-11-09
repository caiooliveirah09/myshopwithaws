import { APP_ROUTES } from './appRoutes'

export const checkIsPublicRoute = (pathname: string): boolean => {
  return Object.values(APP_ROUTES.public).includes(pathname)
}