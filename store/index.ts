import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  username: '',
  password: ''
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  CHANGE_USERNAME: (state, newUsername: string) =>
    (state.username = newUsername),
  CHANGE_PASSWORD: (state, newPassword: string) =>
    (state.password = newPassword)
}

export const actions: ActionTree<RootState, RootState> = {
  login({ commit }, { username, password }) {
    commit('CHANGE_USERNAME', username)
    commit('CHANGE_PASSWORD', password)
  }
}
