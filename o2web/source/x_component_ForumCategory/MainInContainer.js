//用法，z在 cms / 流程表单 / 门户中插入
//MWF.xApplication.ForumCategory = MWF.xApplication.ForumCategory || {};
//MWF.xApplication.ForumCategory.options = MWF.xApplication.ForumCategory.options || {};
//MWF.xDesktop.requireApp("ForumCategory", "MainInContainer", null, false);
//MWF.xApplication.ForumCategory.MainInContainer2 = new Class({
//    Extends: MWF.xApplication.ForumCategory.MainInContainer,
//    loadLayout: function(){
//        this.contentNode = new Element("div", {"styles": this.css.contentNode}).inject(this.node);
//        this.toWeek();
//    }
//});
//var container = this.form.get("container").node;
//var scrollNode = this.target.app.node;
//var forumCategory = new MWF.xApplication.ForumCategory.MainInContainer2( this.target.app.desktop, {}, container, this.target.app.content , scrollNode );
//forumCategory.load();

MWF.xApplication.ForumCategory = MWF.xApplication.ForumCategory || {};
MWF.xApplication.ForumCategory.options = MWF.xApplication.ForumCategory.options || {};
MWF.xDesktop.requireApp("ForumCategory", "lp.zh-cn", null, false);
MWF.xDesktop.requireApp("ForumCategory", "Main", null, false);
MWF.xApplication.ForumCategory.MainInContainer = new Class({
    Extends: MWF.xApplication.ForumCategory.Main,
    Implements: [Options, Events],
    options: {
        "style": "default",
        "name": "ForumCategory",
        "naviMode" : false
    },
    initialize: function(desktop, options, container, content, scrollNode){
        this.setOptions(options);
        this.desktop = desktop;
        this.container = container;
        this.content = content;
        this.scrollNode = scrollNode; 
        this.path = "/x_component_"+this.options.name.replace(/\./g, "_")+"/$Main/";
        this.options.icon = this.path+this.options.style+"/"+this.options.icon;

        this.cssPath =this.path+this.options.style+"/css.wcss";
        this.naviMode = this.options.naviMode;
        //this.inBrowser = true;
        this.inContainer = true;
        this._loadCss();
    },
    loadNoAnimation: function(isCurrent, max, hide){
        this.fireAppEvent("queryLoad");
        if (!this.inContainer){
            this.loadWindow(isCurrent, false, max, hide);
        }else{
            this.loadInBrowser(isCurrent);
        }
    },
    load : function(isCurrent){
        this.fireAppEvent("queryLoad");
        if (!this.inContainer){
            this.loadWindow(isCurrent);
        }else{
            this.loadInBrowser(isCurrent);
        }
    },
    close: function(){
        this.fireAppEvent("queryClose");
        this.setUncurrent();
        if (this.inBrowser){
            window.close();
        }else{
            this.window.close(function(){

                this.taskitem.destroy();
                delete this.window;
                delete this.taskitem;
                this.desktop.closeApp(this);

                this.fireAppEvent("postClose");
                //MWF.recycleCount = 0;
                //debugger;
                MWF.release(this);
                //
                //alert(MWF.recycleCount)
                //debugger;
            }.bind(this));
        }
    },
    loadInBrowser: function(){
        this.window = {
            "isHide": false,
            "isMax": true,
            "maxSize": function(){},
            "restore": function(){},
            "setCurrent": function(){},
            "hide": function(){},
            "maxOrRestoreSize": function(){},
            "restoreSize": function(){},
            "close": function(){},
            "titleText" : {
                set : function(){}
            }
        };
        this.window.content = this.content;
        //this.content = this.window.content;

        //this.content.setStyles({"height": "100%", "overflow": "hidden"});

        //window.addEvent("resize", function(){
        //    this.fireAppEvent("resize");
        //}.bind(this));
        //window.onbeforeunload = function(e){
        //    this.fireAppEvent("queryClose");
        //}.bind(this);

        this.fireAppEvent("postLoadWindow");
        this.fireAppEvent("queryLoadApplication");
        this.setContentEvent();
        this.loadApplication(function(){
            this.fireAppEvent("postLoadApplication");
        }.bind(this));

        //this.content.setStyle("height", document.body.getSize().y);

        this.fireAppEvent("postLoad");
    },
    createNode: function(){
        this.content.setStyle("overflow", "hidden");
        this.node = new Element("div.node", {
            "styles": {"width": "100%", "height": "100%", "overflow": "hidden"}
        }).inject(this.container);
    }
});