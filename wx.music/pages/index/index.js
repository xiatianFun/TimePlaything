Page({
  data: {
    xin:'xin',
    image:[],
    num:1,
    nextMusic:true,
    liked:false,
    fav_nums:'',
    isplay:false,
    musicurl:''
  },
  btnlike(){
    wx.request({
      url: 'http://localhost:3000/likes',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        musicId:this.data.image[0].id
      },
      method: "POST",
      success: res => {
        this.setData({ xin: 'xinMax' })
        setTimeout(() => {
          this.setData({ xin: 'xin' })
        }, 500)
        
      if (this.data.liked){
          this.setData({ fav_nums: this.data.fav_nums - 1 })
        }else{
          this.setData({ fav_nums: this.data.fav_nums + 1 })
        }
        this.setData({ liked: !this.data.liked })
      }
    })
    },
  musicGo(){
    this.setData({ isplay: !this.data.isplay})
    if (this.data.isplay){
      wx.playBackgroundAudio({
        dataUrl: this.data.musicurl,
        title: this.data.image[0].title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
   
  },
  init(){
    wx.request({
      url: 'http://localhost:3000/music',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: res => {
        console.log(res)
        this.setData({
        image:res.data.music,
        liked: res.data.liked,
        fav_nums: res.data.music[0].fav_nums,
        musicurl: res.data.music[0].musicurl
        })
      }
    })
  },
  nextpage(){
    wx.pauseBackgroundAudio()
    if (!this.data.nextMusic){
      wx.showToast({
        title: '这是最后一个了哦～',
        icon:'none'
      })
      return false
    }
    this.setData({ num: this.data.num += 1,isplay:false})
    wx.request({
      url: `http://localhost:3000/music?currentPage=${this.data.num}`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: (res) => {
        console.log(res);
        this.setData({
          image: res.data.music,
          musicurl: res.data.music[0].musicurl,
          nextMusic: res.data.nextmusic,
          liked: res.data.liked,
          fav_nums: res.data.music[0].fav_nums
        })
      }
    })
  },
  previouspage(){
    wx.pauseBackgroundAudio()
    if (this.data.num==1) {
      wx.showToast({
        title: '这已经是第一个了哦～',
        icon: 'none'
      })
      return false
    }
    this.setData({ num: this.data.num -= 1, isplay: false})
    wx.request({
      url: `http://localhost:3000/music?currentPage=${this.data.num}`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: (res) => {
        console.log(res);
        this.setData({
          image: res.data.music,
          musicurl: res.data.music[0].musicurl,
          nextMusic: res.data.nextmusic,
          liked: res.data.liked
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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