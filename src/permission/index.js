import store from '@/store'

/**
   * Determine whether the user has operation rights
   * See if there is a user permission ID collection based on the passed permission ID
   * @param perms
 */
export function hasPermission(perms) {
  let hasPermission = false
  let permissions = store.state.user.perms
  for (let i = 0, len = permissions.length; i < len; i++) {
    if (permissions[i] === perms) {
      hasPermission = true;
      break
    }
  }
  return hasPermission
}

