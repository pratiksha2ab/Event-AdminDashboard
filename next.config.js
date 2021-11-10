var webpack=require("webpack")
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
})