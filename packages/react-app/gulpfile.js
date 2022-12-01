import { task, src, dest } from "gulp";
import gulpless from "gulp-less";
import postcss from "gulp-postcss";
import debug from "gulp-debug";
import csso from "gulp-csso";
import autoprefixer from "autoprefixer";
import NpmImportPlugin from "less-plugin-npm-import";

task("less", function () {
  const plugins = [autoprefixer()];

  return src("src/themes/*-theme.less")
    .pipe(debug({ title: "Less files:" }))
    .pipe(
      gulpless({
        javascriptEnabled: true,
        plugins: [new NpmImportPlugin({ prefix: "~" })],
      }),
    )
    .pipe(postcss(plugins))
    .pipe(
      csso({
        debug: true,
      }),
    )
    .pipe(dest("./public"));
});
