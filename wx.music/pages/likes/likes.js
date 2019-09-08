
Page({
  data: {
    userInfo: {},
    isShow:true,
    likenum:'',
    likebooks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlogin()
    this.handlerGetUserInfo()
    this.getlike()
  },
  btnmusic(e){
    let id = e.currentTarget.dataset.id
    
  },
  getlike(){
    wx.request({
      url: 'http://localhost:3000/likes',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: res => {
        console.log(res)
        this.setData({ likenum: res.data.likes.length, likebooks:res.data.likes})
      }
    })
  },
  getlogin(){
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            isShow: true
          })
        } else {
          this.setData({
            isShow: false
          })
        }
      }
    })
  },
  
  handlerGetUserInfo(){
    wx.getUserInfo({
      success: (data) => {
        //更新data中的userInfo
        this.setData({
          userInfo: data.userInfo,
          isShow: true
        })
      },
      fail: () => {
        console.log("获取用户信息失败");
      }

    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getlogin()
    this.handlerGetUserInfo()
    this.getlike()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})