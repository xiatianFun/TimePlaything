// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    books:[],
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ id: options.id})
    this.getbook()
  },
  inputvalue(e){
    this.setData({ value: e.detail.value})
  },
  addcomment(){
    if(this.data.value==''){
      wx.showToast({
        title: '内容不能为空哦～',
        icon:'none'
      })
      return false
    }
    wx.request({
      method:'POST',
      url: `http://localhost:3000/comments`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        content:this.data.value,
        bookId:this.data.id,
      },
      success: (res) => {
        wx.showToast({
          title: '评论成功',
        })
        this.getbook()
      }
    })
  },
  getbook(){
    wx.request({
      url: `http://localhost:3000/books/${this.data.id}`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: (res) => {
        console.log(res);
        this.setData({
          books: res.data.books
        })
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