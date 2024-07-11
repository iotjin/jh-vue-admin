<template>
  <div id="app">
    <router-view />
    <UpgradeDialog :is-show.sync="needUpgrade" :upgrade-data="upgradeData" />
  </div>
</template>

<script>
import UpgradeDialog from '@/components/upgrade-dialog/index.vue'
import { startPolling, visibilityChange, requestCheckUpgrade } from '@/components/upgrade-dialog/upgradeUtils'

export default {
  name: 'App',
  components: {
    UpgradeDialog
  },
  data() {
    return {
      needUpgrade: false,
      upgradeData: {}
    }
  },
  created() {
    startPolling(() => {
      this.getCheckUpgrade('startPolling')
    })
    visibilityChange(() => {
      this.getCheckUpgrade('visibilityChange')
    })
  },
  methods: {
    // 'startPolling' | 'visibilityChange'
    getCheckUpgrade(type) {
      requestCheckUpgrade()
        .then((data) => {
          this.needUpgrade = data.needUpgrade
          this.upgradeData = data.upgradeData
          if (type === 'startPolling') {
            console.log('needUpgrade111', JSON.stringify(data))
          } else {
            console.log('needUpgrade222', JSON.stringify(data))
          }
        })
        .catch((err) => {
          console.log('err', JSON.stringify(err))
        })
    }
  }
}
</script>
