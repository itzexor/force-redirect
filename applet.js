const Applet = imports.ui.applet;
const Meta = imports.gi.Meta;

function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this._enabled = false;
        this.set_applet_icon_name("non-starred-symbolic");
        this.set_applet_tooltip("Click to force all windows to be redirected");
    },

    _setState: function(state) {
        if (this._enabled == state) return;

        if (state) {
            Meta.disable_unredirect_for_screen(global.get_screen())
            this.set_applet_icon_name("starred-symbolic");
            this.set_applet_tooltip("Click to allow windows to be unredirected");
            this._enabled = true;
        } else {
            Meta.enable_unredirect_for_screen(global.get_screen())
            this.set_applet_icon_name("non-starred-symbolic");
            this.set_applet_tooltip("Click to force all windows to be redirected");
            this._enabled = false;
        }
    },

    on_applet_clicked: function() {
        this._setState(!this._enabled);
    },

    on_applet_removed_from_panel: function() {
        this._setState(false);
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}
