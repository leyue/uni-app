(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/collapse/index"],{"059d":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(e.bind(null,"bb74"))},u={components:{uniIcons:o},props:{title:{type:String,default:"..."},expand:{type:Boolean,default:!0}},data:function(){return{props:{expand:!0},iconName:"arrowup"}},watch:{expand:function(n,t){this.props.expand=n},"props.expand":function(n,t){this.iconName=n?"arrowup":"arrowdown"}},onReady:function(n){this.props.expand=this.expand},methods:{onExpand:function(n){this.props.expand=!this.props.expand}}};t.default=u},"09f3":function(n,t,e){"use strict";e.r(t);var o=e("3dc9"),u=e("2508");for(var a in u)"default"!==a&&function(n){e.d(t,n,function(){return u[n]})}(a);e("32f6");var i=e("2877"),r=Object(i["a"])(u["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},2508:function(n,t,e){"use strict";e.r(t);var o=e("059d"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);t["default"]=u.a},"32f6":function(n,t,e){"use strict";var o=e("5d81"),u=e.n(o);u.a},"3dc9":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return u})},"5d81":function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/collapse/index-create-component',
    {
        'components/collapse/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("09f3"))
        })
    },
    [['components/collapse/index-create-component']]
]);                
