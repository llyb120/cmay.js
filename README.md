# Cmay.js
a lightweight javascript dynamic template just like mvvm framwork


## Dependencies

```javascript
  "dependencies": {
    "babel-polyfill": "^6.22.0",
    "html-dom-parser": "^0.0.2",
    "locutus": "^2.0.6",
    "simple-virtual-dom": "^0.1.9",
    "virtual-html": "^2.0.0"
  }
```

## Install

```javascript
<script src="../dist/dist.js"></script>
```

## Usage
The root element should add attribute "c-tpl=objname".

objname is a object which is watching by Cmay.

when objname changed, the template will rerender as virtual dom and patch it.

{key} is print value from current context.

eg.

```javascript
{each item,index in cart}
<tr>
    <td>{name}</td>
    <td>{price | money}</td>
    <td><input name="cart[{index}][count]" type="number" min=1 value={count}></td>
    <td>{price * count | money}</td>
    <td>
        <a href="javascript:;" onclick="delete data.cart.{index}">remove</a>
    </td>
</tr>
{ end }
```

## License

The MIT License (MIT)

Copyright (c) 2017 llyb120

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.