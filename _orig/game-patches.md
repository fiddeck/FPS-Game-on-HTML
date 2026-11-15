# dist/game.js 改动记录

原始文件：从 Claude artifact 托管地址下载的 `dist/game.js`（2 804 090 字节）。
为了让“语言 / LANGUAGE”成为设置页里的一条**原生设置项**，只改了 3 处，其余字节未动。

## 1) 在 INTERFACE 设置里插入语言行

替换（全文唯一）：

```
{title:"INTERFACE",ic:"hudicon",rows:[
```

为：

```
{title:"INTERFACE",ic:"hudicon",rows:[{k:"lang",label:"LANGUAGE",type:"seg",
  opts:[["en","ENGLISH"],["zh","\u4e2d\u6587"]],
  desc:"Interface language. The change applies immediately."},
```

作用：设置 → 界面 里出现第一行“LANGUAGE / 语言”，点击/方向键切换走游戏自己的
`_set → _syncRow → _pill` 流程，因此外观、胶囊动画、键盘导航与原生设置项一致。

## 2) 提前暴露设置对象与 schema

替换（全文唯一）：

```
_s.motionBlur=Ib.motionBlur);function Pw(){
```

为：

```
_s.motionBlur=Ib.motionBlur);window.__GH_SETTINGS=_s,window.__GH_SCHEMA=VU;function Pw(){
```

作用：`i18n.js` 在游戏启动阶段就能读到设置对象并写入初始语言，
使设置页第一次构建时就选中正确的语言。

## 3) 调试对象里补两个字段

替换（全文唯一）：

```
k9:b.k9.debug}
```

为：

```
k9:b.k9.debug,schema:VU,settings:_s}
```

作用：`i18n.js` 通过 `window.GH.debug.schema` 确认语言行存在、
通过 `window.GH.debug.settings` 同步当前语言。

## 还原方法

把上面三处替换反向执行即可（把新增内容删除）。或在设置页手动改回英文后再还原，
`i18n.js` 删除后游戏就是纯英文原版。
