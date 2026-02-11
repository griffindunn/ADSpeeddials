var Qi = Object.defineProperty;
var ts = (An, kn, Rt) => kn in An ? Qi(An, kn, { enumerable: !0, configurable: !0, writable: !0, value: Rt }) : An[kn] = Rt;
var Gn = (An, kn, Rt) => ts(An, typeof kn != "symbol" ? kn + "" : kn, Rt);
var es = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mi = { exports: {} };
/*! For license information please see index.js.LICENSE.txt */
(function(An, kn) {
  (function(Rt, fe) {
    An.exports = fe();
  })(Object(typeof self < "u" ? self : es), () => (() => {
    var Rt, fe, ke = { 911(d, M, K) {
      var Pt = typeof globalThis < "u" && globalThis || typeof self < "u" && self || K.g !== void 0 && K.g, pt = function() {
        function Kt() {
          this.fetch = !1, this.DOMException = Pt.DOMException;
        }
        return Kt.prototype = Pt, new Kt();
      }();
      (function(Kt) {
        (function(Ht) {
          var Ot = Kt !== void 0 && Kt || typeof self < "u" && self || Ot !== void 0 && Ot, Et = "URLSearchParams" in Ot, Z = "Symbol" in Ot && "iterator" in Symbol, kt = "FileReader" in Ot && "Blob" in Ot && function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          }(), Ut = "FormData" in Ot, Wt = "ArrayBuffer" in Ot;
          if (Wt) var Xt = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], se = ArrayBuffer.isView || function(m) {
            return m && Xt.indexOf(Object.prototype.toString.call(m)) > -1;
          };
          function oe(m) {
            if (typeof m != "string" && (m = String(m)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(m) || m === "") throw new TypeError('Invalid character in header field name: "' + m + '"');
            return m.toLowerCase();
          }
          function qt(m) {
            return typeof m != "string" && (m = String(m)), m;
          }
          function re(m) {
            var D = { next: function() {
              var dt = m.shift();
              return { done: dt === void 0, value: dt };
            } };
            return Z && (D[Symbol.iterator] = function() {
              return D;
            }), D;
          }
          function Tt(m) {
            this.map = {}, m instanceof Tt ? m.forEach(function(D, dt) {
              this.append(dt, D);
            }, this) : Array.isArray(m) ? m.forEach(function(D) {
              this.append(D[0], D[1]);
            }, this) : m && Object.getOwnPropertyNames(m).forEach(function(D) {
              this.append(D, m[D]);
            }, this);
          }
          function At(m) {
            if (m.bodyUsed) return Promise.reject(new TypeError("Already read"));
            m.bodyUsed = !0;
          }
          function te(m) {
            return new Promise(function(D, dt) {
              m.onload = function() {
                D(m.result);
              }, m.onerror = function() {
                dt(m.error);
              };
            });
          }
          function ce(m) {
            var D = new FileReader(), dt = te(D);
            return D.readAsArrayBuffer(m), dt;
          }
          function Ct(m) {
            if (m.slice) return m.slice(0);
            var D = new Uint8Array(m.byteLength);
            return D.set(new Uint8Array(m)), D.buffer;
          }
          function mt() {
            return this.bodyUsed = !1, this._initBody = function(m) {
              var D;
              this.bodyUsed = this.bodyUsed, this._bodyInit = m, m ? typeof m == "string" ? this._bodyText = m : kt && Blob.prototype.isPrototypeOf(m) ? this._bodyBlob = m : Ut && FormData.prototype.isPrototypeOf(m) ? this._bodyFormData = m : Et && URLSearchParams.prototype.isPrototypeOf(m) ? this._bodyText = m.toString() : Wt && kt && (D = m) && DataView.prototype.isPrototypeOf(D) ? (this._bodyArrayBuffer = Ct(m.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : Wt && (ArrayBuffer.prototype.isPrototypeOf(m) || se(m)) ? this._bodyArrayBuffer = Ct(m) : this._bodyText = m = Object.prototype.toString.call(m) : this._bodyText = "", this.headers.get("content-type") || (typeof m == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : Et && URLSearchParams.prototype.isPrototypeOf(m) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
            }, kt && (this.blob = function() {
              var m = At(this);
              if (m) return m;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData) throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }, this.arrayBuffer = function() {
              return this._bodyArrayBuffer ? At(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer)) : this.blob().then(ce);
            }), this.text = function() {
              var m, D, dt, yt = At(this);
              if (yt) return yt;
              if (this._bodyBlob) return m = this._bodyBlob, dt = te(D = new FileReader()), D.readAsText(m), dt;
              if (this._bodyArrayBuffer) return Promise.resolve(function(at) {
                for (var j = new Uint8Array(at), E = new Array(j.length), q = 0; q < j.length; q++) E[q] = String.fromCharCode(j[q]);
                return E.join("");
              }(this._bodyArrayBuffer));
              if (this._bodyFormData) throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText);
            }, Ut && (this.formData = function() {
              return this.text().then(R);
            }), this.json = function() {
              return this.text().then(JSON.parse);
            }, this;
          }
          Tt.prototype.append = function(m, D) {
            m = oe(m), D = qt(D);
            var dt = this.map[m];
            this.map[m] = dt ? dt + ", " + D : D;
          }, Tt.prototype.delete = function(m) {
            delete this.map[oe(m)];
          }, Tt.prototype.get = function(m) {
            return m = oe(m), this.has(m) ? this.map[m] : null;
          }, Tt.prototype.has = function(m) {
            return this.map.hasOwnProperty(oe(m));
          }, Tt.prototype.set = function(m, D) {
            this.map[oe(m)] = qt(D);
          }, Tt.prototype.forEach = function(m, D) {
            for (var dt in this.map) this.map.hasOwnProperty(dt) && m.call(D, this.map[dt], dt, this);
          }, Tt.prototype.keys = function() {
            var m = [];
            return this.forEach(function(D, dt) {
              m.push(dt);
            }), re(m);
          }, Tt.prototype.values = function() {
            var m = [];
            return this.forEach(function(D) {
              m.push(D);
            }), re(m);
          }, Tt.prototype.entries = function() {
            var m = [];
            return this.forEach(function(D, dt) {
              m.push([dt, D]);
            }), re(m);
          }, Z && (Tt.prototype[Symbol.iterator] = Tt.prototype.entries);
          var jt = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function A(m, D) {
            if (!(this instanceof A)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            var dt, yt, at = (D = D || {}).body;
            if (m instanceof A) {
              if (m.bodyUsed) throw new TypeError("Already read");
              this.url = m.url, this.credentials = m.credentials, D.headers || (this.headers = new Tt(m.headers)), this.method = m.method, this.mode = m.mode, this.signal = m.signal, at || m._bodyInit == null || (at = m._bodyInit, m.bodyUsed = !0);
            } else this.url = String(m);
            if (this.credentials = D.credentials || this.credentials || "same-origin", !D.headers && this.headers || (this.headers = new Tt(D.headers)), this.method = (yt = (dt = D.method || this.method || "GET").toUpperCase(), jt.indexOf(yt) > -1 ? yt : dt), this.mode = D.mode || this.mode || null, this.signal = D.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && at) throw new TypeError("Body not allowed for GET or HEAD requests");
            if (this._initBody(at), !(this.method !== "GET" && this.method !== "HEAD" || D.cache !== "no-store" && D.cache !== "no-cache")) {
              var j = /([?&])_=[^&]*/;
              j.test(this.url) ? this.url = this.url.replace(j, "$1_=" + (/* @__PURE__ */ new Date()).getTime()) : this.url += (/\?/.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
          function R(m) {
            var D = new FormData();
            return m.trim().split("&").forEach(function(dt) {
              if (dt) {
                var yt = dt.split("="), at = yt.shift().replace(/\+/g, " "), j = yt.join("=").replace(/\+/g, " ");
                D.append(decodeURIComponent(at), decodeURIComponent(j));
              }
            }), D;
          }
          function N(m, D) {
            if (!(this instanceof N)) throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
            D || (D = {}), this.type = "default", this.status = D.status === void 0 ? 200 : D.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = D.statusText === void 0 ? "" : "" + D.statusText, this.headers = new Tt(D.headers), this.url = D.url || "", this._initBody(m);
          }
          A.prototype.clone = function() {
            return new A(this, { body: this._bodyInit });
          }, mt.call(A.prototype), mt.call(N.prototype), N.prototype.clone = function() {
            return new N(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new Tt(this.headers), url: this.url });
          }, N.error = function() {
            var m = new N(null, { status: 0, statusText: "" });
            return m.type = "error", m;
          };
          var C = [301, 302, 303, 307, 308];
          N.redirect = function(m, D) {
            if (C.indexOf(D) === -1) throw new RangeError("Invalid status code");
            return new N(null, { status: D, headers: { location: m } });
          }, Ht.DOMException = Ot.DOMException;
          try {
            new Ht.DOMException();
          } catch {
            Ht.DOMException = function(D, dt) {
              this.message = D, this.name = dt;
              var yt = Error(D);
              this.stack = yt.stack;
            }, Ht.DOMException.prototype = Object.create(Error.prototype), Ht.DOMException.prototype.constructor = Ht.DOMException;
          }
          function V(m, D) {
            return new Promise(function(dt, yt) {
              var at = new A(m, D);
              if (at.signal && at.signal.aborted) return yt(new Ht.DOMException("Aborted", "AbortError"));
              var j = new XMLHttpRequest();
              function E() {
                j.abort();
              }
              j.onload = function() {
                var q, Y, Oe = { status: j.status, statusText: j.statusText, headers: (q = j.getAllResponseHeaders() || "", Y = new Tt(), q.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(Ne) {
                  return Ne.indexOf(`
`) === 0 ? Ne.substr(1, Ne.length) : Ne;
                }).forEach(function(Ne) {
                  var Ve = Ne.split(":"), He = Ve.shift().trim();
                  if (He) {
                    var S = Ve.join(":").trim();
                    Y.append(He, S);
                  }
                }), Y) };
                Oe.url = "responseURL" in j ? j.responseURL : Oe.headers.get("X-Request-URL");
                var be = "response" in j ? j.response : j.responseText;
                setTimeout(function() {
                  dt(new N(be, Oe));
                }, 0);
              }, j.onerror = function() {
                setTimeout(function() {
                  yt(new TypeError("Network request failed"));
                }, 0);
              }, j.ontimeout = function() {
                setTimeout(function() {
                  yt(new TypeError("Network request failed"));
                }, 0);
              }, j.onabort = function() {
                setTimeout(function() {
                  yt(new Ht.DOMException("Aborted", "AbortError"));
                }, 0);
              }, j.open(at.method, function(q) {
                try {
                  return q === "" && Ot.location.href ? Ot.location.href : q;
                } catch {
                  return q;
                }
              }(at.url), !0), at.credentials === "include" ? j.withCredentials = !0 : at.credentials === "omit" && (j.withCredentials = !1), "responseType" in j && (kt ? j.responseType = "blob" : Wt && at.headers.get("Content-Type") && at.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (j.responseType = "arraybuffer")), !D || typeof D.headers != "object" || D.headers instanceof Tt ? at.headers.forEach(function(q, Y) {
                j.setRequestHeader(Y, q);
              }) : Object.getOwnPropertyNames(D.headers).forEach(function(q) {
                j.setRequestHeader(q, qt(D.headers[q]));
              }), at.signal && (at.signal.addEventListener("abort", E), j.onreadystatechange = function() {
                j.readyState === 4 && at.signal.removeEventListener("abort", E);
              }), j.send(at._bodyInit === void 0 ? null : at._bodyInit);
            });
          }
          V.polyfill = !0, Ot.fetch || (Ot.fetch = V, Ot.Headers = Tt, Ot.Request = A, Ot.Response = N), Ht.Headers = Tt, Ht.Request = A, Ht.Response = N, Ht.fetch = V;
        })({});
      })(pt), pt.fetch.ponyfill = !0, delete pt.fetch.polyfill;
      var _t = Pt.fetch ? Pt : pt;
      (M = _t.fetch).default = _t.fetch, M.fetch = _t.fetch, M.Headers = _t.Headers, M.Request = _t.Request, M.Response = _t.Response, d.exports = M;
    }, 913(d, M, K) {
      var Pt = K(265), pt = K(131), _t = K(186), Kt = K(206), Ht = K(748), Ot = d.exports = function(Et, Z) {
        var kt, Ut, Wt, Xt, se;
        return arguments.length < 2 || typeof Et != "string" ? (Xt = Z, Z = Et, Et = null) : Xt = arguments[2], Pt(Et) ? (kt = Ht.call(Et, "c"), Ut = Ht.call(Et, "e"), Wt = Ht.call(Et, "w")) : (kt = Wt = !0, Ut = !1), se = { value: Z, configurable: kt, enumerable: Ut, writable: Wt }, Xt ? _t(Kt(Xt), se) : se;
      };
      Ot.gs = function(Et, Z, kt) {
        var Ut, Wt, Xt, se;
        return typeof Et != "string" ? (Xt = kt, kt = Z, Z = Et, Et = null) : Xt = arguments[3], Pt(Z) ? pt(Z) ? Pt(kt) ? pt(kt) || (Xt = kt, kt = void 0) : kt = void 0 : (Xt = Z, Z = kt = void 0) : Z = void 0, Pt(Et) ? (Ut = Ht.call(Et, "c"), Wt = Ht.call(Et, "e")) : (Ut = !0, Wt = !1), se = { get: Z, set: kt, configurable: Ut, enumerable: Wt }, Xt ? _t(Kt(Xt), se) : se;
      };
    }, 441(d) {
      d.exports = function() {
      };
    }, 186(d, M, K) {
      d.exports = K(665)() ? Object.assign : K(573);
    }, 665(d) {
      d.exports = function() {
        var M, K = Object.assign;
        return typeof K == "function" && (K(M = { foo: "raz" }, { bar: "dwa" }, { trzy: "trzy" }), M.foo + M.bar + M.trzy === "razdwatrzy");
      };
    }, 573(d, M, K) {
      var Pt = K(555), pt = K(856), _t = Math.max;
      d.exports = function(Kt, Ht) {
        var Ot, Et, Z, kt = _t(arguments.length, 2);
        for (Kt = Object(pt(Kt)), Z = function(Ut) {
          try {
            Kt[Ut] = Ht[Ut];
          } catch (Wt) {
            Ot || (Ot = Wt);
          }
        }, Et = 1; Et < kt; ++Et) Pt(Ht = arguments[Et]).forEach(Z);
        if (Ot !== void 0) throw Ot;
        return Kt;
      };
    }, 658(d, M, K) {
      var Pt = K(136), pt = { function: !0, object: !0 };
      d.exports = function(_t) {
        return Pt(_t) && pt[typeof _t] || !1;
      };
    }, 136(d, M, K) {
      var Pt = K(441)();
      d.exports = function(pt) {
        return pt !== Pt && pt !== null;
      };
    }, 555(d, M, K) {
      d.exports = K(98)() ? Object.keys : K(954);
    }, 98(d) {
      d.exports = function() {
        try {
          return Object.keys("primitive"), !0;
        } catch {
          return !1;
        }
      };
    }, 954(d, M, K) {
      var Pt = K(136), pt = Object.keys;
      d.exports = function(_t) {
        return pt(Pt(_t) ? Object(_t) : _t);
      };
    }, 206(d, M, K) {
      var Pt = K(136), pt = Array.prototype.forEach, _t = Object.create;
      d.exports = function(Kt) {
        var Ht = _t(null);
        return pt.call(arguments, function(Ot) {
          Pt(Ot) && function(Et, Z) {
            var kt;
            for (kt in Et) Z[kt] = Et[kt];
          }(Object(Ot), Ht);
        }), Ht;
      };
    }, 805(d) {
      d.exports = function(M) {
        if (typeof M != "function") throw new TypeError(M + " is not a function");
        return M;
      };
    }, 666(d, M, K) {
      var Pt = K(658);
      d.exports = function(pt) {
        if (!Pt(pt)) throw new TypeError(pt + " is not an Object");
        return pt;
      };
    }, 856(d, M, K) {
      var Pt = K(136);
      d.exports = function(pt) {
        if (!Pt(pt)) throw new TypeError("Cannot use null or undefined");
        return pt;
      };
    }, 748(d, M, K) {
      d.exports = K(875)() ? String.prototype.contains : K(339);
    }, 875(d) {
      var M = "razdwatrzy";
      d.exports = function() {
        return typeof M.contains == "function" && M.contains("dwa") === !0 && M.contains("foo") === !1;
      };
    }, 339(d) {
      var M = String.prototype.indexOf;
      d.exports = function(K) {
        return M.call(this, K, arguments[1]) > -1;
      };
    }, 497(d, M, K) {
      var Pt = K(666), pt = Object.prototype.hasOwnProperty;
      d.exports = function(_t) {
        var Kt, Ht = arguments[1];
        if (Pt(_t), Ht === void 0) pt.call(_t, "__ee__") && delete _t.__ee__;
        else {
          if (!(Kt = pt.call(_t, "__ee__") && _t.__ee__)) return;
          Kt[Ht] && delete Kt[Ht];
        }
      };
    }, 322(d, M, K) {
      var Pt, pt, _t, Kt, Ht, Ot, Et, Z = K(913), kt = K(805), Ut = Function.prototype.apply, Wt = Function.prototype.call, Xt = Object.create, se = Object.defineProperty, oe = Object.defineProperties, qt = Object.prototype.hasOwnProperty, re = { configurable: !0, enumerable: !1, writable: !0 };
      pt = function(Tt, At) {
        var te, ce;
        return kt(At), ce = this, Pt.call(this, Tt, te = function() {
          _t.call(ce, Tt, te), Ut.call(At, this, arguments);
        }), te.__eeOnceListener__ = At, this;
      }, Kt = function(Tt) {
        var At, te, ce, Ct, mt;
        if (qt.call(this, "__ee__") && (Ct = this.__ee__[Tt])) if (typeof Ct == "object") {
          for (te = arguments.length, mt = new Array(te - 1), At = 1; At < te; ++At) mt[At - 1] = arguments[At];
          for (Ct = Ct.slice(), At = 0; ce = Ct[At]; ++At) Ut.call(ce, this, mt);
        } else switch (arguments.length) {
          case 1:
            Wt.call(Ct, this);
            break;
          case 2:
            Wt.call(Ct, this, arguments[1]);
            break;
          case 3:
            Wt.call(Ct, this, arguments[1], arguments[2]);
            break;
          default:
            for (te = arguments.length, mt = new Array(te - 1), At = 1; At < te; ++At) mt[At - 1] = arguments[At];
            Ut.call(Ct, this, mt);
        }
      }, Ht = { on: Pt = function(Tt, At) {
        var te;
        return kt(At), qt.call(this, "__ee__") ? te = this.__ee__ : (te = re.value = Xt(null), se(this, "__ee__", re), re.value = null), te[Tt] ? typeof te[Tt] == "object" ? te[Tt].push(At) : te[Tt] = [te[Tt], At] : te[Tt] = At, this;
      }, once: pt, off: _t = function(Tt, At) {
        var te, ce, Ct, mt;
        if (kt(At), !qt.call(this, "__ee__")) return this;
        if (!(te = this.__ee__)[Tt]) return this;
        if (typeof (ce = te[Tt]) == "object") for (mt = 0; Ct = ce[mt]; ++mt) Ct !== At && Ct.__eeOnceListener__ !== At || (ce.length === 2 ? te[Tt] = ce[mt ? 0 : 1] : ce.splice(mt, 1));
        else ce !== At && ce.__eeOnceListener__ !== At || delete te[Tt];
        return this;
      }, emit: Kt }, Ot = { on: Z(Pt), once: Z(pt), off: Z(_t), emit: Z(Kt) }, Et = oe({}, Ot), d.exports = M = function(Tt) {
        return Tt == null ? Xt(Et) : oe(Object(Tt), Ot);
      }, M.methods = Ht;
    }, 545(d) {
      const M = (S) => typeof S == "string", K = () => {
        let S, r;
        const n = new Promise((u, f) => {
          S = u, r = f;
        });
        return n.resolve = S, n.reject = r, n;
      }, Pt = (S) => S == null ? "" : "" + S, pt = /###/g, _t = (S) => S && S.indexOf("###") > -1 ? S.replace(pt, ".") : S, Kt = (S) => !S || M(S), Ht = (S, r, n) => {
        const u = M(r) ? r.split(".") : r;
        let f = 0;
        for (; f < u.length - 1; ) {
          if (Kt(S)) return {};
          const k = _t(u[f]);
          !S[k] && n && (S[k] = new n()), S = Object.prototype.hasOwnProperty.call(S, k) ? S[k] : {}, ++f;
        }
        return Kt(S) ? {} : { obj: S, k: _t(u[f]) };
      }, Ot = (S, r, n) => {
        const { obj: u, k: f } = Ht(S, r, Object);
        if (u !== void 0 || r.length === 1) return void (u[f] = n);
        let k = r[r.length - 1], P = r.slice(0, r.length - 1), G = Ht(S, P, Object);
        for (; G.obj === void 0 && P.length; ) k = `${P[P.length - 1]}.${k}`, P = P.slice(0, P.length - 1), G = Ht(S, P, Object), G && G.obj && G.obj[`${G.k}.${k}`] !== void 0 && (G.obj = void 0);
        G.obj[`${G.k}.${k}`] = n;
      }, Et = (S, r) => {
        const { obj: n, k: u } = Ht(S, r);
        if (n) return n[u];
      }, Z = (S, r, n) => {
        for (const u in r) u !== "__proto__" && u !== "constructor" && (u in S ? M(S[u]) || S[u] instanceof String || M(r[u]) || r[u] instanceof String ? n && (S[u] = r[u]) : Z(S[u], r[u], n) : S[u] = r[u]);
        return S;
      }, kt = (S) => S.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      var Ut = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
      const Wt = (S) => M(S) ? S.replace(/[&<>"'\/]/g, (r) => Ut[r]) : S, Xt = [" ", ",", "?", "!", ";"], se = new class {
        constructor(S) {
          this.capacity = S, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
        }
        getRegExp(S) {
          const r = this.regExpMap.get(S);
          if (r !== void 0) return r;
          const n = new RegExp(S);
          return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(S, n), this.regExpQueue.push(S), n;
        }
      }(20), oe = function(S, r) {
        let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
        if (!S) return;
        if (S[r]) return S[r];
        const u = r.split(n);
        let f = S;
        for (let k = 0; k < u.length; ) {
          if (!f || typeof f != "object") return;
          let P, G = "";
          for (let z = k; z < u.length; ++z) if (z !== k && (G += n), G += u[z], P = f[G], P !== void 0) {
            if (["string", "number", "boolean"].indexOf(typeof P) > -1 && z < u.length - 1) continue;
            k += z - k + 1;
            break;
          }
          f = P;
        }
        return f;
      }, qt = (S) => S && S.replace("_", "-"), re = { type: "logger", log(S) {
        this.output("log", S);
      }, warn(S) {
        this.output("warn", S);
      }, error(S) {
        this.output("error", S);
      }, output(S, r) {
        console && console[S] && console[S].apply(console, r);
      } };
      class Tt {
        constructor(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.init(r, n);
        }
        init(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.prefix = n.prefix || "i18next:", this.logger = r || re, this.options = n, this.debug = n.debug;
        }
        log() {
          for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++) n[u] = arguments[u];
          return this.forward(n, "log", "", !0);
        }
        warn() {
          for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++) n[u] = arguments[u];
          return this.forward(n, "warn", "", !0);
        }
        error() {
          for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++) n[u] = arguments[u];
          return this.forward(n, "error", "");
        }
        deprecate() {
          for (var r = arguments.length, n = new Array(r), u = 0; u < r; u++) n[u] = arguments[u];
          return this.forward(n, "warn", "WARNING DEPRECATED: ", !0);
        }
        forward(r, n, u, f) {
          return f && !this.debug ? null : (M(r[0]) && (r[0] = `${u}${this.prefix} ${r[0]}`), this.logger[n](r));
        }
        create(r) {
          return new Tt(this.logger, { prefix: `${this.prefix}:${r}:`, ...this.options });
        }
        clone(r) {
          return (r = r || this.options).prefix = r.prefix || this.prefix, new Tt(this.logger, r);
        }
      }
      var At = new Tt();
      class te {
        constructor() {
          this.observers = {};
        }
        on(r, n) {
          return r.split(" ").forEach((u) => {
            this.observers[u] || (this.observers[u] = /* @__PURE__ */ new Map());
            const f = this.observers[u].get(n) || 0;
            this.observers[u].set(n, f + 1);
          }), this;
        }
        off(r, n) {
          this.observers[r] && (n ? this.observers[r].delete(n) : delete this.observers[r]);
        }
        emit(r) {
          for (var n = arguments.length, u = new Array(n > 1 ? n - 1 : 0), f = 1; f < n; f++) u[f - 1] = arguments[f];
          this.observers[r] && Array.from(this.observers[r].entries()).forEach((k) => {
            let [P, G] = k;
            for (let z = 0; z < G; z++) P(...u);
          }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach((k) => {
            let [P, G] = k;
            for (let z = 0; z < G; z++) P.apply(P, [r, ...u]);
          });
        }
      }
      class ce extends te {
        constructor(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { ns: ["translation"], defaultNS: "translation" };
          super(), this.data = r || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
        }
        addNamespaces(r) {
          this.options.ns.indexOf(r) < 0 && this.options.ns.push(r);
        }
        removeNamespaces(r) {
          const n = this.options.ns.indexOf(r);
          n > -1 && this.options.ns.splice(n, 1);
        }
        getResource(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          const k = f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator, P = f.ignoreJSONStructure !== void 0 ? f.ignoreJSONStructure : this.options.ignoreJSONStructure;
          let G;
          r.indexOf(".") > -1 ? G = r.split(".") : (G = [r, n], u && (Array.isArray(u) ? G.push(...u) : M(u) && k ? G.push(...u.split(k)) : G.push(u)));
          const z = Et(this.data, G);
          return !z && !n && !u && r.indexOf(".") > -1 && (r = G[0], n = G[1], u = G.slice(2).join(".")), !z && P && M(u) ? oe(this.data && this.data[r] && this.data[r][n], u, k) : z;
        }
        addResource(r, n, u, f) {
          let k = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : { silent: !1 };
          const P = k.keySeparator !== void 0 ? k.keySeparator : this.options.keySeparator;
          let G = [r, n];
          u && (G = G.concat(P ? u.split(P) : u)), r.indexOf(".") > -1 && (G = r.split("."), f = n, n = G[1]), this.addNamespaces(n), Ot(this.data, G, f), k.silent || this.emit("added", r, n, u, f);
        }
        addResources(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : { silent: !1 };
          for (const k in u) (M(u[k]) || Array.isArray(u[k])) && this.addResource(r, n, k, u[k], { silent: !0 });
          f.silent || this.emit("added", r, n, u);
        }
        addResourceBundle(r, n, u, f, k) {
          let P = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : { silent: !1, skipCopy: !1 }, G = [r, n];
          r.indexOf(".") > -1 && (G = r.split("."), f = u, u = n, n = G[1]), this.addNamespaces(n);
          let z = Et(this.data, G) || {};
          P.skipCopy || (u = JSON.parse(JSON.stringify(u))), f ? Z(z, u, k) : z = { ...z, ...u }, Ot(this.data, G, z), P.silent || this.emit("added", r, n, u);
        }
        removeResourceBundle(r, n) {
          this.hasResourceBundle(r, n) && delete this.data[r][n], this.removeNamespaces(n), this.emit("removed", r, n);
        }
        hasResourceBundle(r, n) {
          return this.getResource(r, n) !== void 0;
        }
        getResourceBundle(r, n) {
          return n || (n = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? { ...this.getResource(r, n) } : this.getResource(r, n);
        }
        getDataByLanguage(r) {
          return this.data[r];
        }
        hasLanguageSomeTranslations(r) {
          const n = this.getDataByLanguage(r);
          return !!(n && Object.keys(n) || []).find((u) => n[u] && Object.keys(n[u]).length > 0);
        }
        toJSON() {
          return this.data;
        }
      }
      var Ct = { processors: {}, addPostProcessor(S) {
        this.processors[S.name] = S;
      }, handle(S, r, n, u, f) {
        return S.forEach((k) => {
          this.processors[k] && (r = this.processors[k].process(r, n, u, f));
        }), r;
      } };
      const mt = {};
      class jt extends te {
        constructor(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var u, f;
          super(), u = r, f = this, ["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"].forEach((k) => {
            u[k] && (f[k] = u[k]);
          }), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = At.create("translator");
        }
        changeLanguage(r) {
          r && (this.language = r);
        }
        exists(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { interpolation: {} };
          if (r == null) return !1;
          const u = this.resolve(r, n);
          return u && u.res !== void 0;
        }
        extractFromKey(r, n) {
          let u = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
          u === void 0 && (u = ":");
          const f = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
          let k = n.ns || this.options.defaultNS || [];
          const P = u && r.indexOf(u) > -1, G = !(this.options.userDefinedKeySeparator || n.keySeparator || this.options.userDefinedNsSeparator || n.nsSeparator || ((z, X, lt) => {
            X = X || "", lt = lt || "";
            const ct = Xt.filter((Qt) => X.indexOf(Qt) < 0 && lt.indexOf(Qt) < 0);
            if (ct.length === 0) return !0;
            const Q = se.getRegExp(`(${ct.map((Qt) => Qt === "?" ? "\\?" : Qt).join("|")})`);
            let Jt = !Q.test(z);
            if (!Jt) {
              const Qt = z.indexOf(lt);
              Qt > 0 && !Q.test(z.substring(0, Qt)) && (Jt = !0);
            }
            return Jt;
          })(r, u, f));
          if (P && !G) {
            const z = r.match(this.interpolator.nestingRegexp);
            if (z && z.length > 0) return { key: r, namespaces: M(k) ? [k] : k };
            const X = r.split(u);
            (u !== f || u === f && this.options.ns.indexOf(X[0]) > -1) && (k = X.shift()), r = X.join(f);
          }
          return { key: r, namespaces: M(k) ? [k] : k };
        }
        translate(r, n, u) {
          if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = { ...n }), n || (n = {}), r == null) return "";
          Array.isArray(r) || (r = [String(r)]);
          const f = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, k = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, { key: P, namespaces: G } = this.extractFromKey(r[r.length - 1], n), z = G[G.length - 1], X = n.lng || this.language, lt = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
          if (X && X.toLowerCase() === "cimode") {
            if (lt) {
              const J = n.nsSeparator || this.options.nsSeparator;
              return f ? { res: `${z}${J}${P}`, usedKey: P, exactUsedKey: P, usedLng: X, usedNS: z, usedParams: this.getUsedParamsDetails(n) } : `${z}${J}${P}`;
            }
            return f ? { res: P, usedKey: P, exactUsedKey: P, usedLng: X, usedNS: z, usedParams: this.getUsedParamsDetails(n) } : P;
          }
          const ct = this.resolve(r, n);
          let Q = ct && ct.res;
          const Jt = ct && ct.usedKey || P, Qt = ct && ct.exactUsedKey || P, we = Object.prototype.toString.apply(Q), Te = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, Fe = !this.i18nFormat || this.i18nFormat.handleAsObject, de = !M(Q) && typeof Q != "boolean" && typeof Q != "number";
          if (!(Fe && Q && de && ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(we) < 0) || M(Te) && Array.isArray(Q)) if (Fe && M(Te) && Array.isArray(Q)) Q = Q.join(Te), Q && (Q = this.extendTranslation(Q, r, n, u));
          else {
            let J = !1, b = !1;
            const nt = n.count !== void 0 && !M(n.count), it = jt.hasDefaultValue(n), st = nt ? this.pluralResolver.getSuffix(X, n.count, n) : "", ht = n.ordinal && nt ? this.pluralResolver.getSuffix(X, n.count, { ordinal: !1 }) : "", It = nt && !n.ordinal && n.count === 0 && this.pluralResolver.shouldUseIntlApi(), T = It && n[`defaultValue${this.options.pluralSeparator}zero`] || n[`defaultValue${st}`] || n[`defaultValue${ht}`] || n.defaultValue;
            !this.isValidLookup(Q) && it && (J = !0, Q = T), this.isValidLookup(Q) || (b = !0, Q = P);
            const x = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && b ? void 0 : Q, U = it && T !== Q && this.options.updateMissing;
            if (b || J || U) {
              if (this.logger.log(U ? "updateKey" : "missingKey", X, z, P, U ? T : Q), k) {
                const Nt = this.resolve(P, { ...n, keySeparator: !1 });
                Nt && Nt.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
              }
              let $ = [];
              const H = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
              if (this.options.saveMissingTo === "fallback" && H && H[0]) for (let Nt = 0; Nt < H.length; Nt++) $.push(H[Nt]);
              else this.options.saveMissingTo === "all" ? $ = this.languageUtils.toResolveHierarchy(n.lng || this.language) : $.push(n.lng || this.language);
              const rt = (Nt, Bt, Ee) => {
                const me = it && Ee !== Q ? Ee : x;
                this.options.missingKeyHandler ? this.options.missingKeyHandler(Nt, z, Bt, me, U, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(Nt, z, Bt, me, U, n), this.emit("missingKey", Nt, z, Bt, Q);
              };
              this.options.saveMissing && (this.options.saveMissingPlurals && nt ? $.forEach((Nt) => {
                const Bt = this.pluralResolver.getSuffixes(Nt, n);
                It && n[`defaultValue${this.options.pluralSeparator}zero`] && Bt.indexOf(`${this.options.pluralSeparator}zero`) < 0 && Bt.push(`${this.options.pluralSeparator}zero`), Bt.forEach((Ee) => {
                  rt([Nt], P + Ee, n[`defaultValue${Ee}`] || T);
                });
              }) : rt($, P, T));
            }
            Q = this.extendTranslation(Q, r, n, ct, u), b && Q === P && this.options.appendNamespaceToMissingKey && (Q = `${z}:${P}`), (b || J) && this.options.parseMissingKeyHandler && (Q = this.options.compatibilityAPI !== "v1" ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${z}:${P}` : P, J ? Q : void 0) : this.options.parseMissingKeyHandler(Q));
          }
          else {
            if (!n.returnObjects && !this.options.returnObjects) {
              this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
              const J = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(Jt, Q, { ...n, ns: G }) : `key '${P} (${this.language})' returned an object instead of string.`;
              return f ? (ct.res = J, ct.usedParams = this.getUsedParamsDetails(n), ct) : J;
            }
            if (k) {
              const J = Array.isArray(Q), b = J ? [] : {}, nt = J ? Qt : Jt;
              for (const it in Q) if (Object.prototype.hasOwnProperty.call(Q, it)) {
                const st = `${nt}${k}${it}`;
                b[it] = this.translate(st, { ...n, joinArrays: !1, ns: G }), b[it] === st && (b[it] = Q[it]);
              }
              Q = b;
            }
          }
          return f ? (ct.res = Q, ct.usedParams = this.getUsedParamsDetails(n), ct) : Q;
        }
        extendTranslation(r, n, u, f, k) {
          var P = this;
          if (this.i18nFormat && this.i18nFormat.parse) r = this.i18nFormat.parse(r, { ...this.options.interpolation.defaultVariables, ...u }, u.lng || this.language || f.usedLng, f.usedNS, f.usedKey, { resolved: f });
          else if (!u.skipInterpolation) {
            u.interpolation && this.interpolator.init({ ...u, interpolation: { ...this.options.interpolation, ...u.interpolation } });
            const X = M(r) && (u && u.interpolation && u.interpolation.skipOnVariables !== void 0 ? u.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            let lt;
            if (X) {
              const Q = r.match(this.interpolator.nestingRegexp);
              lt = Q && Q.length;
            }
            let ct = u.replace && !M(u.replace) ? u.replace : u;
            if (this.options.interpolation.defaultVariables && (ct = { ...this.options.interpolation.defaultVariables, ...ct }), r = this.interpolator.interpolate(r, ct, u.lng || this.language || f.usedLng, u), X) {
              const Q = r.match(this.interpolator.nestingRegexp);
              lt < (Q && Q.length) && (u.nest = !1);
            }
            !u.lng && this.options.compatibilityAPI !== "v1" && f && f.res && (u.lng = this.language || f.usedLng), u.nest !== !1 && (r = this.interpolator.nest(r, function() {
              for (var Q = arguments.length, Jt = new Array(Q), Qt = 0; Qt < Q; Qt++) Jt[Qt] = arguments[Qt];
              return k && k[0] === Jt[0] && !u.context ? (P.logger.warn(`It seems you are nesting recursively key: ${Jt[0]} in key: ${n[0]}`), null) : P.translate(...Jt, n);
            }, u)), u.interpolation && this.interpolator.reset();
          }
          const G = u.postProcess || this.options.postProcess, z = M(G) ? [G] : G;
          return r != null && z && z.length && u.applyPostProcessor !== !1 && (r = Ct.handle(z, r, n, this.options && this.options.postProcessPassResolved ? { i18nResolved: { ...f, usedParams: this.getUsedParamsDetails(u) }, ...u } : u, this)), r;
        }
        resolve(r) {
          let n, u, f, k, P, G = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return M(r) && (r = [r]), r.forEach((z) => {
            if (this.isValidLookup(n)) return;
            const X = this.extractFromKey(z, G), lt = X.key;
            u = lt;
            let ct = X.namespaces;
            this.options.fallbackNS && (ct = ct.concat(this.options.fallbackNS));
            const Q = G.count !== void 0 && !M(G.count), Jt = Q && !G.ordinal && G.count === 0 && this.pluralResolver.shouldUseIntlApi(), Qt = G.context !== void 0 && (M(G.context) || typeof G.context == "number") && G.context !== "", we = G.lngs ? G.lngs : this.languageUtils.toResolveHierarchy(G.lng || this.language, G.fallbackLng);
            ct.forEach((Te) => {
              this.isValidLookup(n) || (P = Te, !mt[`${we[0]}-${Te}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(P) && (mt[`${we[0]}-${Te}`] = !0, this.logger.warn(`key "${u}" for languages "${we.join(", ")}" won't get resolved as namespace "${P}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), we.forEach((Fe) => {
                if (this.isValidLookup(n)) return;
                k = Fe;
                const de = [lt];
                if (this.i18nFormat && this.i18nFormat.addLookupKeys) this.i18nFormat.addLookupKeys(de, lt, Fe, Te, G);
                else {
                  let b;
                  Q && (b = this.pluralResolver.getSuffix(Fe, G.count, G));
                  const nt = `${this.options.pluralSeparator}zero`, it = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                  if (Q && (de.push(lt + b), G.ordinal && b.indexOf(it) === 0 && de.push(lt + b.replace(it, this.options.pluralSeparator)), Jt && de.push(lt + nt)), Qt) {
                    const st = `${lt}${this.options.contextSeparator}${G.context}`;
                    de.push(st), Q && (de.push(st + b), G.ordinal && b.indexOf(it) === 0 && de.push(st + b.replace(it, this.options.pluralSeparator)), Jt && de.push(st + nt));
                  }
                }
                let J;
                for (; J = de.pop(); ) this.isValidLookup(n) || (f = J, n = this.getResource(Fe, Te, J, G));
              }));
            });
          }), { res: n, usedKey: u, exactUsedKey: f, usedLng: k, usedNS: P };
        }
        isValidLookup(r) {
          return !(r === void 0 || !this.options.returnNull && r === null || !this.options.returnEmptyString && r === "");
        }
        getResource(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(r, n, u, f) : this.resourceStore.getResource(r, n, u, f);
        }
        getUsedParamsDetails() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], u = r.replace && !M(r.replace);
          let f = u ? r.replace : r;
          if (u && r.count !== void 0 && (f.count = r.count), this.options.interpolation.defaultVariables && (f = { ...this.options.interpolation.defaultVariables, ...f }), !u) {
            f = { ...f };
            for (const k of n) delete f[k];
          }
          return f;
        }
        static hasDefaultValue(r) {
          for (const n in r) if (Object.prototype.hasOwnProperty.call(r, n) && n.substring(0, 12) === "defaultValue" && r[n] !== void 0) return !0;
          return !1;
        }
      }
      const A = (S) => S.charAt(0).toUpperCase() + S.slice(1);
      class R {
        constructor(r) {
          this.options = r, this.supportedLngs = this.options.supportedLngs || !1, this.logger = At.create("languageUtils");
        }
        getScriptPartFromCode(r) {
          if (!(r = qt(r)) || r.indexOf("-") < 0) return null;
          const n = r.split("-");
          return n.length === 2 ? null : (n.pop(), n[n.length - 1].toLowerCase() === "x" ? null : this.formatLanguageCode(n.join("-")));
        }
        getLanguagePartFromCode(r) {
          if (!(r = qt(r)) || r.indexOf("-") < 0) return r;
          const n = r.split("-");
          return this.formatLanguageCode(n[0]);
        }
        formatLanguageCode(r) {
          if (M(r) && r.indexOf("-") > -1) {
            if (typeof Intl < "u" && Intl.getCanonicalLocales !== void 0) try {
              let f = Intl.getCanonicalLocales(r)[0];
              if (f && this.options.lowerCaseLng && (f = f.toLowerCase()), f) return f;
            } catch {
            }
            const n = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
            let u = r.split("-");
            return this.options.lowerCaseLng ? u = u.map((f) => f.toLowerCase()) : u.length === 2 ? (u[0] = u[0].toLowerCase(), u[1] = u[1].toUpperCase(), n.indexOf(u[1].toLowerCase()) > -1 && (u[1] = A(u[1].toLowerCase()))) : u.length === 3 && (u[0] = u[0].toLowerCase(), u[1].length === 2 && (u[1] = u[1].toUpperCase()), u[0] !== "sgn" && u[2].length === 2 && (u[2] = u[2].toUpperCase()), n.indexOf(u[1].toLowerCase()) > -1 && (u[1] = A(u[1].toLowerCase())), n.indexOf(u[2].toLowerCase()) > -1 && (u[2] = A(u[2].toLowerCase()))), u.join("-");
          }
          return this.options.cleanCode || this.options.lowerCaseLng ? r.toLowerCase() : r;
        }
        isSupportedCode(r) {
          return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (r = this.getLanguagePartFromCode(r)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(r) > -1;
        }
        getBestMatchFromCodes(r) {
          if (!r) return null;
          let n;
          return r.forEach((u) => {
            if (n) return;
            const f = this.formatLanguageCode(u);
            this.options.supportedLngs && !this.isSupportedCode(f) || (n = f);
          }), !n && this.options.supportedLngs && r.forEach((u) => {
            if (n) return;
            const f = this.getLanguagePartFromCode(u);
            if (this.isSupportedCode(f)) return n = f;
            n = this.options.supportedLngs.find((k) => k === f ? k : k.indexOf("-") < 0 && f.indexOf("-") < 0 ? void 0 : k.indexOf("-") > 0 && f.indexOf("-") < 0 && k.substring(0, k.indexOf("-")) === f || k.indexOf(f) === 0 && f.length > 1 ? k : void 0);
          }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
        }
        getFallbackCodes(r, n) {
          if (!r) return [];
          if (typeof r == "function" && (r = r(n)), M(r) && (r = [r]), Array.isArray(r)) return r;
          if (!n) return r.default || [];
          let u = r[n];
          return u || (u = r[this.getScriptPartFromCode(n)]), u || (u = r[this.formatLanguageCode(n)]), u || (u = r[this.getLanguagePartFromCode(n)]), u || (u = r.default), u || [];
        }
        toResolveHierarchy(r, n) {
          const u = this.getFallbackCodes(n || this.options.fallbackLng || [], r), f = [], k = (P) => {
            P && (this.isSupportedCode(P) ? f.push(P) : this.logger.warn(`rejecting language code not found in supportedLngs: ${P}`));
          };
          return M(r) && (r.indexOf("-") > -1 || r.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && k(this.formatLanguageCode(r)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && k(this.getScriptPartFromCode(r)), this.options.load !== "currentOnly" && k(this.getLanguagePartFromCode(r))) : M(r) && k(this.formatLanguageCode(r)), u.forEach((P) => {
            f.indexOf(P) < 0 && k(this.formatLanguageCode(P));
          }), f;
        }
      }
      let N = [{ lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"], nr: [1, 2], fc: 1 }, { lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"], nr: [1, 2], fc: 2 }, { lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"], nr: [1], fc: 3 }, { lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"], nr: [1, 2, 5], fc: 4 }, { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 }, { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 }, { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ["fr"], nr: [1, 2], fc: 9 }, { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ["is"], nr: [1, 2], fc: 12 }, { lngs: ["jv"], nr: [0, 1], fc: 13 }, { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ["lt"], nr: [1, 2, 10], fc: 15 }, { lngs: ["lv"], nr: [1, 2, 0], fc: 16 }, { lngs: ["mk"], nr: [1, 2], fc: 17 }, { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 }, { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ["or"], nr: [2, 1], fc: 2 }, { lngs: ["ro"], nr: [1, 2, 20], fc: 20 }, { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 }, { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 }], C = { 1: (S) => +(S > 1), 2: (S) => +(S != 1), 3: (S) => 0, 4: (S) => S % 10 == 1 && S % 100 != 11 ? 0 : S % 10 >= 2 && S % 10 <= 4 && (S % 100 < 10 || S % 100 >= 20) ? 1 : 2, 5: (S) => S == 0 ? 0 : S == 1 ? 1 : S == 2 ? 2 : S % 100 >= 3 && S % 100 <= 10 ? 3 : S % 100 >= 11 ? 4 : 5, 6: (S) => S == 1 ? 0 : S >= 2 && S <= 4 ? 1 : 2, 7: (S) => S == 1 ? 0 : S % 10 >= 2 && S % 10 <= 4 && (S % 100 < 10 || S % 100 >= 20) ? 1 : 2, 8: (S) => S == 1 ? 0 : S == 2 ? 1 : S != 8 && S != 11 ? 2 : 3, 9: (S) => +(S >= 2), 10: (S) => S == 1 ? 0 : S == 2 ? 1 : S < 7 ? 2 : S < 11 ? 3 : 4, 11: (S) => S == 1 || S == 11 ? 0 : S == 2 || S == 12 ? 1 : S > 2 && S < 20 ? 2 : 3, 12: (S) => +(S % 10 != 1 || S % 100 == 11), 13: (S) => +(S !== 0), 14: (S) => S == 1 ? 0 : S == 2 ? 1 : S == 3 ? 2 : 3, 15: (S) => S % 10 == 1 && S % 100 != 11 ? 0 : S % 10 >= 2 && (S % 100 < 10 || S % 100 >= 20) ? 1 : 2, 16: (S) => S % 10 == 1 && S % 100 != 11 ? 0 : S !== 0 ? 1 : 2, 17: (S) => S == 1 || S % 10 == 1 && S % 100 != 11 ? 0 : 1, 18: (S) => S == 0 ? 0 : S == 1 ? 1 : 2, 19: (S) => S == 1 ? 0 : S == 0 || S % 100 > 1 && S % 100 < 11 ? 1 : S % 100 > 10 && S % 100 < 20 ? 2 : 3, 20: (S) => S == 1 ? 0 : S == 0 || S % 100 > 0 && S % 100 < 20 ? 1 : 2, 21: (S) => S % 100 == 1 ? 1 : S % 100 == 2 ? 2 : S % 100 == 3 || S % 100 == 4 ? 3 : 0, 22: (S) => S == 1 ? 0 : S == 2 ? 1 : (S < 0 || S > 10) && S % 10 == 0 ? 2 : 3 };
      const V = ["v1", "v2", "v3"], m = ["v4"], D = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 };
      class dt {
        constructor(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.languageUtils = r, this.options = n, this.logger = At.create("pluralResolver"), this.options.compatibilityJSON && !m.includes(this.options.compatibilityJSON) || typeof Intl < "u" && Intl.PluralRules || (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = (() => {
            const u = {};
            return N.forEach((f) => {
              f.lngs.forEach((k) => {
                u[k] = { numbers: f.nr, plurals: C[f.fc] };
              });
            }), u;
          })(), this.pluralRulesCache = {};
        }
        addRule(r, n) {
          this.rules[r] = n;
        }
        clearCache() {
          this.pluralRulesCache = {};
        }
        getRule(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (this.shouldUseIntlApi()) {
            const u = qt(r === "dev" ? "en" : r), f = n.ordinal ? "ordinal" : "cardinal", k = JSON.stringify({ cleanedCode: u, type: f });
            if (k in this.pluralRulesCache) return this.pluralRulesCache[k];
            let P;
            try {
              P = new Intl.PluralRules(u, { type: f });
            } catch {
              if (!r.match(/-|_/)) return;
              const z = this.languageUtils.getLanguagePartFromCode(r);
              P = this.getRule(z, n);
            }
            return this.pluralRulesCache[k] = P, P;
          }
          return this.rules[r] || this.rules[this.languageUtils.getLanguagePartFromCode(r)];
        }
        needsPlural(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          const u = this.getRule(r, n);
          return this.shouldUseIntlApi() ? u && u.resolvedOptions().pluralCategories.length > 1 : u && u.numbers.length > 1;
        }
        getPluralFormsOfKey(r, n) {
          let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return this.getSuffixes(r, u).map((f) => `${n}${f}`);
        }
        getSuffixes(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          const u = this.getRule(r, n);
          return u ? this.shouldUseIntlApi() ? u.resolvedOptions().pluralCategories.sort((f, k) => D[f] - D[k]).map((f) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${f}`) : u.numbers.map((f) => this.getSuffix(r, f, n)) : [];
        }
        getSuffix(r, n) {
          let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          const f = this.getRule(r, u);
          return f ? this.shouldUseIntlApi() ? `${this.options.prepend}${u.ordinal ? `ordinal${this.options.prepend}` : ""}${f.select(n)}` : this.getSuffixRetroCompatible(f, n) : (this.logger.warn(`no plural rule found for: ${r}`), "");
        }
        getSuffixRetroCompatible(r, n) {
          const u = r.noAbs ? r.plurals(n) : r.plurals(Math.abs(n));
          let f = r.numbers[u];
          this.options.simplifyPluralSuffix && r.numbers.length === 2 && r.numbers[0] === 1 && (f === 2 ? f = "plural" : f === 1 && (f = ""));
          const k = () => this.options.prepend && f.toString() ? this.options.prepend + f.toString() : f.toString();
          return this.options.compatibilityJSON === "v1" ? f === 1 ? "" : typeof f == "number" ? `_plural_${f.toString()}` : k() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && r.numbers.length === 2 && r.numbers[0] === 1 ? k() : this.options.prepend && u.toString() ? this.options.prepend + u.toString() : u.toString();
        }
        shouldUseIntlApi() {
          return !V.includes(this.options.compatibilityJSON);
        }
      }
      const yt = function(S, r, n) {
        let u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", f = !(arguments.length > 4 && arguments[4] !== void 0) || arguments[4], k = ((P, G, z) => {
          const X = Et(P, z);
          return X !== void 0 ? X : Et(G, z);
        })(S, r, n);
        return !k && f && M(n) && (k = oe(S, n, u), k === void 0 && (k = oe(r, n, u))), k;
      }, at = (S) => S.replace(/\$/g, "$$$$");
      class j {
        constructor() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.logger = At.create("interpolator"), this.options = r, this.format = r.interpolation && r.interpolation.format || ((n) => n), this.init(r);
        }
        init() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          r.interpolation || (r.interpolation = { escapeValue: !0 });
          const { escape: n, escapeValue: u, useRawValueToEscape: f, prefix: k, prefixEscaped: P, suffix: G, suffixEscaped: z, formatSeparator: X, unescapeSuffix: lt, unescapePrefix: ct, nestingPrefix: Q, nestingPrefixEscaped: Jt, nestingSuffix: Qt, nestingSuffixEscaped: we, nestingOptionsSeparator: Te, maxReplaces: Fe, alwaysFormat: de } = r.interpolation;
          this.escape = n !== void 0 ? n : Wt, this.escapeValue = u === void 0 || u, this.useRawValueToEscape = f !== void 0 && f, this.prefix = k ? kt(k) : P || "{{", this.suffix = G ? kt(G) : z || "}}", this.formatSeparator = X || ",", this.unescapePrefix = lt ? "" : ct || "-", this.unescapeSuffix = this.unescapePrefix ? "" : lt || "", this.nestingPrefix = Q ? kt(Q) : Jt || kt("$t("), this.nestingSuffix = Qt ? kt(Qt) : we || kt(")"), this.nestingOptionsSeparator = Te || ",", this.maxReplaces = Fe || 1e3, this.alwaysFormat = de !== void 0 && de, this.resetRegExp();
        }
        reset() {
          this.options && this.init(this.options);
        }
        resetRegExp() {
          const r = (n, u) => n && n.source === u ? (n.lastIndex = 0, n) : new RegExp(u, "g");
          this.regexp = r(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = r(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = r(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
        }
        interpolate(r, n, u, f) {
          let k, P, G;
          const z = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, X = (Q) => {
            if (Q.indexOf(this.formatSeparator) < 0) {
              const Te = yt(n, z, Q, this.options.keySeparator, this.options.ignoreJSONStructure);
              return this.alwaysFormat ? this.format(Te, void 0, u, { ...f, ...n, interpolationkey: Q }) : Te;
            }
            const Jt = Q.split(this.formatSeparator), Qt = Jt.shift().trim(), we = Jt.join(this.formatSeparator).trim();
            return this.format(yt(n, z, Qt, this.options.keySeparator, this.options.ignoreJSONStructure), we, u, { ...f, ...n, interpolationkey: Qt });
          };
          this.resetRegExp();
          const lt = f && f.missingInterpolationHandler || this.options.missingInterpolationHandler, ct = f && f.interpolation && f.interpolation.skipOnVariables !== void 0 ? f.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
          return [{ regex: this.regexpUnescape, safeValue: (Q) => at(Q) }, { regex: this.regexp, safeValue: (Q) => this.escapeValue ? at(this.escape(Q)) : at(Q) }].forEach((Q) => {
            for (G = 0; k = Q.regex.exec(r); ) {
              const Jt = k[1].trim();
              if (P = X(Jt), P === void 0) if (typeof lt == "function") {
                const we = lt(r, k, f);
                P = M(we) ? we : "";
              } else if (f && Object.prototype.hasOwnProperty.call(f, Jt)) P = "";
              else {
                if (ct) {
                  P = k[0];
                  continue;
                }
                this.logger.warn(`missed to pass in variable ${Jt} for interpolating ${r}`), P = "";
              }
              else M(P) || this.useRawValueToEscape || (P = Pt(P));
              const Qt = Q.safeValue(P);
              if (r = r.replace(k[0], Qt), ct ? (Q.regex.lastIndex += P.length, Q.regex.lastIndex -= k[0].length) : Q.regex.lastIndex = 0, G++, G >= this.maxReplaces) break;
            }
          }), r;
        }
        nest(r, n) {
          let u, f, k, P = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          const G = (z, X) => {
            const lt = this.nestingOptionsSeparator;
            if (z.indexOf(lt) < 0) return z;
            const ct = z.split(new RegExp(`${lt}[ ]*{`));
            let Q = `{${ct[1]}`;
            z = ct[0], Q = this.interpolate(Q, k);
            const Jt = Q.match(/'/g), Qt = Q.match(/"/g);
            (Jt && Jt.length % 2 == 0 && !Qt || Qt.length % 2 != 0) && (Q = Q.replace(/'/g, '"'));
            try {
              k = JSON.parse(Q), X && (k = { ...X, ...k });
            } catch (we) {
              return this.logger.warn(`failed parsing options string in nesting for key ${z}`, we), `${z}${lt}${Q}`;
            }
            return k.defaultValue && k.defaultValue.indexOf(this.prefix) > -1 && delete k.defaultValue, z;
          };
          for (; u = this.nestingRegexp.exec(r); ) {
            let z = [];
            k = { ...P }, k = k.replace && !M(k.replace) ? k.replace : k, k.applyPostProcessor = !1, delete k.defaultValue;
            let X = !1;
            if (u[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(u[1])) {
              const lt = u[1].split(this.formatSeparator).map((ct) => ct.trim());
              u[1] = lt.shift(), z = lt, X = !0;
            }
            if (f = n(G.call(this, u[1].trim(), k), k), f && u[0] === r && !M(f)) return f;
            M(f) || (f = Pt(f)), f || (this.logger.warn(`missed to resolve ${u[1]} for nesting ${r}`), f = ""), X && (f = z.reduce((lt, ct) => this.format(lt, ct, P.lng, { ...P, interpolationkey: u[1].trim() }), f.trim())), r = r.replace(u[0], f), this.regexp.lastIndex = 0;
          }
          return r;
        }
      }
      const E = (S) => {
        const r = {};
        return (n, u, f) => {
          let k = f;
          f && f.interpolationkey && f.formatParams && f.formatParams[f.interpolationkey] && f[f.interpolationkey] && (k = { ...k, [f.interpolationkey]: void 0 });
          const P = u + JSON.stringify(k);
          let G = r[P];
          return G || (G = S(qt(u), f), r[P] = G), G(n);
        };
      };
      class q {
        constructor() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.logger = At.create("formatter"), this.options = r, this.formats = { number: E((n, u) => {
            const f = new Intl.NumberFormat(n, { ...u });
            return (k) => f.format(k);
          }), currency: E((n, u) => {
            const f = new Intl.NumberFormat(n, { ...u, style: "currency" });
            return (k) => f.format(k);
          }), datetime: E((n, u) => {
            const f = new Intl.DateTimeFormat(n, { ...u });
            return (k) => f.format(k);
          }), relativetime: E((n, u) => {
            const f = new Intl.RelativeTimeFormat(n, { ...u });
            return (k) => f.format(k, u.range || "day");
          }), list: E((n, u) => {
            const f = new Intl.ListFormat(n, { ...u });
            return (k) => f.format(k);
          }) }, this.init(r);
        }
        init(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { interpolation: {} };
          this.formatSeparator = n.interpolation.formatSeparator || ",";
        }
        add(r, n) {
          this.formats[r.toLowerCase().trim()] = n;
        }
        addCached(r, n) {
          this.formats[r.toLowerCase().trim()] = E(n);
        }
        format(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          const k = n.split(this.formatSeparator);
          if (k.length > 1 && k[0].indexOf("(") > 1 && k[0].indexOf(")") < 0 && k.find((P) => P.indexOf(")") > -1)) {
            const P = k.findIndex((G) => G.indexOf(")") > -1);
            k[0] = [k[0], ...k.splice(1, P)].join(this.formatSeparator);
          }
          return k.reduce((P, G) => {
            const { formatName: z, formatOptions: X } = ((lt) => {
              let ct = lt.toLowerCase().trim();
              const Q = {};
              if (lt.indexOf("(") > -1) {
                const Jt = lt.split("(");
                ct = Jt[0].toLowerCase().trim();
                const Qt = Jt[1].substring(0, Jt[1].length - 1);
                ct === "currency" && Qt.indexOf(":") < 0 ? Q.currency || (Q.currency = Qt.trim()) : ct === "relativetime" && Qt.indexOf(":") < 0 ? Q.range || (Q.range = Qt.trim()) : Qt.split(";").forEach((we) => {
                  if (we) {
                    const [Te, ...Fe] = we.split(":"), de = Fe.join(":").trim().replace(/^'+|'+$/g, ""), J = Te.trim();
                    Q[J] || (Q[J] = de), de === "false" && (Q[J] = !1), de === "true" && (Q[J] = !0), isNaN(de) || (Q[J] = parseInt(de, 10));
                  }
                });
              }
              return { formatName: ct, formatOptions: Q };
            })(G);
            if (this.formats[z]) {
              let lt = P;
              try {
                const ct = f && f.formatParams && f.formatParams[f.interpolationkey] || {}, Q = ct.locale || ct.lng || f.locale || f.lng || u;
                lt = this.formats[z](P, Q, { ...X, ...f, ...ct });
              } catch (ct) {
                this.logger.warn(ct);
              }
              return lt;
            }
            return this.logger.warn(`there was no format function for ${z}`), P;
          }, r);
        }
      }
      class Y extends te {
        constructor(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          super(), this.backend = r, this.store = n, this.services = u, this.languageUtils = u.languageUtils, this.options = f, this.logger = At.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = f.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = f.maxRetries >= 0 ? f.maxRetries : 5, this.retryTimeout = f.retryTimeout >= 1 ? f.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(u, f.backend, f);
        }
        queueLoad(r, n, u, f) {
          const k = {}, P = {}, G = {}, z = {};
          return r.forEach((X) => {
            let lt = !0;
            n.forEach((ct) => {
              const Q = `${X}|${ct}`;
              !u.reload && this.store.hasResourceBundle(X, ct) ? this.state[Q] = 2 : this.state[Q] < 0 || (this.state[Q] === 1 ? P[Q] === void 0 && (P[Q] = !0) : (this.state[Q] = 1, lt = !1, P[Q] === void 0 && (P[Q] = !0), k[Q] === void 0 && (k[Q] = !0), z[ct] === void 0 && (z[ct] = !0)));
            }), lt || (G[X] = !0);
          }), (Object.keys(k).length || Object.keys(P).length) && this.queue.push({ pending: P, pendingCount: Object.keys(P).length, loaded: {}, errors: [], callback: f }), { toLoad: Object.keys(k), pending: Object.keys(P), toLoadLanguages: Object.keys(G), toLoadNamespaces: Object.keys(z) };
        }
        loaded(r, n, u) {
          const f = r.split("|"), k = f[0], P = f[1];
          n && this.emit("failedLoading", k, P, n), !n && u && this.store.addResourceBundle(k, P, u, void 0, void 0, { skipCopy: !0 }), this.state[r] = n ? -1 : 2, n && u && (this.state[r] = 0);
          const G = {};
          this.queue.forEach((z) => {
            ((X, lt, ct) => {
              const { obj: Q, k: Jt } = Ht(X, lt, Object);
              Q[Jt] = Q[Jt] || [], Q[Jt].push(ct);
            })(z.loaded, [k], P), ((X, lt) => {
              X.pending[lt] !== void 0 && (delete X.pending[lt], X.pendingCount--);
            })(z, r), n && z.errors.push(n), z.pendingCount !== 0 || z.done || (Object.keys(z.loaded).forEach((X) => {
              G[X] || (G[X] = {});
              const lt = z.loaded[X];
              lt.length && lt.forEach((ct) => {
                G[X][ct] === void 0 && (G[X][ct] = !0);
              });
            }), z.done = !0, z.errors.length ? z.callback(z.errors) : z.callback());
          }), this.emit("loaded", G), this.queue = this.queue.filter((z) => !z.done);
        }
        read(r, n, u) {
          let f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, k = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, P = arguments.length > 5 ? arguments[5] : void 0;
          if (!r.length) return P(null, {});
          if (this.readingCalls >= this.maxParallelReads) return void this.waitingReads.push({ lng: r, ns: n, fcName: u, tried: f, wait: k, callback: P });
          this.readingCalls++;
          const G = (X, lt) => {
            if (this.readingCalls--, this.waitingReads.length > 0) {
              const ct = this.waitingReads.shift();
              this.read(ct.lng, ct.ns, ct.fcName, ct.tried, ct.wait, ct.callback);
            }
            X && lt && f < this.maxRetries ? setTimeout(() => {
              this.read.call(this, r, n, u, f + 1, 2 * k, P);
            }, k) : P(X, lt);
          }, z = this.backend[u].bind(this.backend);
          if (z.length !== 2) return z(r, n, G);
          try {
            const X = z(r, n);
            X && typeof X.then == "function" ? X.then((lt) => G(null, lt)).catch(G) : G(null, X);
          } catch (X) {
            G(X);
          }
        }
        prepareLoading(r, n) {
          let u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, f = arguments.length > 3 ? arguments[3] : void 0;
          if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), f && f();
          M(r) && (r = this.languageUtils.toResolveHierarchy(r)), M(n) && (n = [n]);
          const k = this.queueLoad(r, n, u, f);
          if (!k.toLoad.length) return k.pending.length || f(), null;
          k.toLoad.forEach((P) => {
            this.loadOne(P);
          });
        }
        load(r, n, u) {
          this.prepareLoading(r, n, {}, u);
        }
        reload(r, n, u) {
          this.prepareLoading(r, n, { reload: !0 }, u);
        }
        loadOne(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          const u = r.split("|"), f = u[0], k = u[1];
          this.read(f, k, "read", void 0, void 0, (P, G) => {
            P && this.logger.warn(`${n}loading namespace ${k} for language ${f} failed`, P), !P && G && this.logger.log(`${n}loaded namespace ${k} for language ${f}`, G), this.loaded(r, P, G);
          });
        }
        saveMissing(r, n, u, f, k) {
          let P = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, G = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
          };
          if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(n)) this.logger.warn(`did not save key "${u}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
          else if (u != null && u !== "") {
            if (this.backend && this.backend.create) {
              const z = { ...P, isUpdate: k }, X = this.backend.create.bind(this.backend);
              if (X.length < 6) try {
                let lt;
                lt = X.length === 5 ? X(r, n, u, f, z) : X(r, n, u, f), lt && typeof lt.then == "function" ? lt.then((ct) => G(null, ct)).catch(G) : G(null, lt);
              } catch (lt) {
                G(lt);
              }
              else X(r, n, u, f, G, z);
            }
            r && r[0] && this.store.addResource(r[0], n, u, f);
          }
        }
      }
      const Oe = () => ({ debug: !1, initImmediate: !0, ns: ["translation"], defaultNS: ["translation"], fallbackLng: ["dev"], fallbackNS: !1, supportedLngs: !1, nonExplicitSupportedLngs: !1, load: "all", preload: !1, simplifyPluralSuffix: !0, keySeparator: ".", nsSeparator: ":", pluralSeparator: "_", contextSeparator: "_", partialBundledLanguages: !1, saveMissing: !1, updateMissing: !1, saveMissingTo: "fallback", saveMissingPlurals: !0, missingKeyHandler: !1, missingInterpolationHandler: !1, postProcess: !1, postProcessPassResolved: !1, returnNull: !1, returnEmptyString: !0, returnObjects: !1, joinArrays: !1, returnedObjectHandler: !1, parseMissingKeyHandler: !1, appendNamespaceToMissingKey: !1, appendNamespaceToCIMode: !1, overloadTranslationOptionHandler: (S) => {
        let r = {};
        if (typeof S[1] == "object" && (r = S[1]), M(S[1]) && (r.defaultValue = S[1]), M(S[2]) && (r.tDescription = S[2]), typeof S[2] == "object" || typeof S[3] == "object") {
          const n = S[3] || S[2];
          Object.keys(n).forEach((u) => {
            r[u] = n[u];
          });
        }
        return r;
      }, interpolation: { escapeValue: !0, format: (S) => S, prefix: "{{", suffix: "}}", formatSeparator: ",", unescapePrefix: "-", nestingPrefix: "$t(", nestingSuffix: ")", nestingOptionsSeparator: ",", maxReplaces: 1e3, skipOnVariables: !0 } }), be = (S) => (M(S.ns) && (S.ns = [S.ns]), M(S.fallbackLng) && (S.fallbackLng = [S.fallbackLng]), M(S.fallbackNS) && (S.fallbackNS = [S.fallbackNS]), S.supportedLngs && S.supportedLngs.indexOf("cimode") < 0 && (S.supportedLngs = S.supportedLngs.concat(["cimode"])), S), Ne = () => {
      };
      class Ve extends te {
        constructor() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
          var u;
          if (super(), this.options = be(r), this.services = {}, this.logger = At, this.modules = { external: [] }, u = this, Object.getOwnPropertyNames(Object.getPrototypeOf(u)).forEach((f) => {
            typeof u[f] == "function" && (u[f] = u[f].bind(u));
          }), n && !this.isInitialized && !r.isClone) {
            if (!this.options.initImmediate) return this.init(r, n), this;
            setTimeout(() => {
              this.init(r, n);
            }, 0);
          }
        }
        init() {
          var r = this;
          let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = arguments.length > 1 ? arguments[1] : void 0;
          this.isInitializing = !0, typeof n == "function" && (u = n, n = {}), !n.defaultNS && n.defaultNS !== !1 && n.ns && (M(n.ns) ? n.defaultNS = n.ns : n.ns.indexOf("translation") < 0 && (n.defaultNS = n.ns[0]));
          const f = Oe();
          this.options = { ...f, ...this.options, ...be(n) }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = { ...f.interpolation, ...this.options.interpolation }), n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
          const k = (z) => z ? typeof z == "function" ? new z() : z : null;
          if (!this.options.isClone) {
            let z;
            this.modules.logger ? At.init(k(this.modules.logger), this.options) : At.init(null, this.options), this.modules.formatter ? z = this.modules.formatter : typeof Intl < "u" && (z = q);
            const X = new R(this.options);
            this.store = new ce(this.options.resources, this.options);
            const lt = this.services;
            lt.logger = At, lt.resourceStore = this.store, lt.languageUtils = X, lt.pluralResolver = new dt(X, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix }), !z || this.options.interpolation.format && this.options.interpolation.format !== f.interpolation.format || (lt.formatter = k(z), lt.formatter.init(lt, this.options), this.options.interpolation.format = lt.formatter.format.bind(lt.formatter)), lt.interpolator = new j(this.options), lt.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }, lt.backendConnector = new Y(k(this.modules.backend), lt.resourceStore, lt, this.options), lt.backendConnector.on("*", function(ct) {
              for (var Q = arguments.length, Jt = new Array(Q > 1 ? Q - 1 : 0), Qt = 1; Qt < Q; Qt++) Jt[Qt - 1] = arguments[Qt];
              r.emit(ct, ...Jt);
            }), this.modules.languageDetector && (lt.languageDetector = k(this.modules.languageDetector), lt.languageDetector.init && lt.languageDetector.init(lt, this.options.detection, this.options)), this.modules.i18nFormat && (lt.i18nFormat = k(this.modules.i18nFormat), lt.i18nFormat.init && lt.i18nFormat.init(this)), this.translator = new jt(this.services, this.options), this.translator.on("*", function(ct) {
              for (var Q = arguments.length, Jt = new Array(Q > 1 ? Q - 1 : 0), Qt = 1; Qt < Q; Qt++) Jt[Qt - 1] = arguments[Qt];
              r.emit(ct, ...Jt);
            }), this.modules.external.forEach((ct) => {
              ct.init && ct.init(this);
            });
          }
          if (this.format = this.options.interpolation.format, u || (u = Ne), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            const z = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            z.length > 0 && z[0] !== "dev" && (this.options.lng = z[0]);
          }
          this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((z) => {
            this[z] = function() {
              return r.store[z](...arguments);
            };
          }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((z) => {
            this[z] = function() {
              return r.store[z](...arguments), r;
            };
          });
          const P = K(), G = () => {
            const z = (X, lt) => {
              this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), P.resolve(lt), u(X, lt);
            };
            if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized) return z(null, this.t.bind(this));
            this.changeLanguage(this.options.lng, z);
          };
          return this.options.resources || !this.options.initImmediate ? G() : setTimeout(G, 0), P;
        }
        loadResources(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne;
          const u = M(r) ? r : this.language;
          if (typeof r == "function" && (n = r), !this.options.resources || this.options.partialBundledLanguages) {
            if (u && u.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return n();
            const f = [], k = (P) => {
              P && P !== "cimode" && this.services.languageUtils.toResolveHierarchy(P).forEach((G) => {
                G !== "cimode" && f.indexOf(G) < 0 && f.push(G);
              });
            };
            u ? k(u) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((P) => k(P)), this.options.preload && this.options.preload.forEach((P) => k(P)), this.services.backendConnector.load(f, this.options.ns, (P) => {
              P || this.resolvedLanguage || !this.language || this.setResolvedLanguage(this.language), n(P);
            });
          } else n(null);
        }
        reloadResources(r, n, u) {
          const f = K();
          return typeof r == "function" && (u = r, r = void 0), typeof n == "function" && (u = n, n = void 0), r || (r = this.languages), n || (n = this.options.ns), u || (u = Ne), this.services.backendConnector.reload(r, n, (k) => {
            f.resolve(), u(k);
          }), f;
        }
        use(r) {
          if (!r) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
          if (!r.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
          return r.type === "backend" && (this.modules.backend = r), (r.type === "logger" || r.log && r.warn && r.error) && (this.modules.logger = r), r.type === "languageDetector" && (this.modules.languageDetector = r), r.type === "i18nFormat" && (this.modules.i18nFormat = r), r.type === "postProcessor" && Ct.addPostProcessor(r), r.type === "formatter" && (this.modules.formatter = r), r.type === "3rdParty" && this.modules.external.push(r), this;
        }
        setResolvedLanguage(r) {
          if (r && this.languages && !(["cimode", "dev"].indexOf(r) > -1)) for (let n = 0; n < this.languages.length; n++) {
            const u = this.languages[n];
            if (!(["cimode", "dev"].indexOf(u) > -1) && this.store.hasLanguageSomeTranslations(u)) {
              this.resolvedLanguage = u;
              break;
            }
          }
        }
        changeLanguage(r, n) {
          var u = this;
          this.isLanguageChangingTo = r;
          const f = K();
          this.emit("languageChanging", r);
          const k = (z) => {
            this.language = z, this.languages = this.services.languageUtils.toResolveHierarchy(z), this.resolvedLanguage = void 0, this.setResolvedLanguage(z);
          }, P = (z, X) => {
            X ? (k(X), this.translator.changeLanguage(X), this.isLanguageChangingTo = void 0, this.emit("languageChanged", X), this.logger.log("languageChanged", X)) : this.isLanguageChangingTo = void 0, f.resolve(function() {
              return u.t(...arguments);
            }), n && n(z, function() {
              return u.t(...arguments);
            });
          }, G = (z) => {
            r || z || !this.services.languageDetector || (z = []);
            const X = M(z) ? z : this.services.languageUtils.getBestMatchFromCodes(z);
            X && (this.language || k(X), this.translator.language || this.translator.changeLanguage(X), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(X)), this.loadResources(X, (lt) => {
              P(lt, X);
            });
          };
          return r || !this.services.languageDetector || this.services.languageDetector.async ? !r && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(G) : this.services.languageDetector.detect(G) : G(r) : G(this.services.languageDetector.detect()), f;
        }
        getFixedT(r, n, u) {
          var f = this;
          const k = function(P, G) {
            let z;
            if (typeof G != "object") {
              for (var X = arguments.length, lt = new Array(X > 2 ? X - 2 : 0), ct = 2; ct < X; ct++) lt[ct - 2] = arguments[ct];
              z = f.options.overloadTranslationOptionHandler([P, G].concat(lt));
            } else z = { ...G };
            z.lng = z.lng || k.lng, z.lngs = z.lngs || k.lngs, z.ns = z.ns || k.ns, z.keyPrefix !== "" && (z.keyPrefix = z.keyPrefix || u || k.keyPrefix);
            const Q = f.options.keySeparator || ".";
            let Jt;
            return Jt = z.keyPrefix && Array.isArray(P) ? P.map((Qt) => `${z.keyPrefix}${Q}${Qt}`) : z.keyPrefix ? `${z.keyPrefix}${Q}${P}` : P, f.t(Jt, z);
          };
          return M(r) ? k.lng = r : k.lngs = r, k.ns = n, k.keyPrefix = u, k;
        }
        t() {
          return this.translator && this.translator.translate(...arguments);
        }
        exists() {
          return this.translator && this.translator.exists(...arguments);
        }
        setDefaultNamespace(r) {
          this.options.defaultNS = r;
        }
        hasLoadedNamespace(r) {
          let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
          if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
          const u = n.lng || this.resolvedLanguage || this.languages[0], f = !!this.options && this.options.fallbackLng, k = this.languages[this.languages.length - 1];
          if (u.toLowerCase() === "cimode") return !0;
          const P = (G, z) => {
            const X = this.services.backendConnector.state[`${G}|${z}`];
            return X === -1 || X === 0 || X === 2;
          };
          if (n.precheck) {
            const G = n.precheck(this, P);
            if (G !== void 0) return G;
          }
          return !(!this.hasResourceBundle(u, r) && this.services.backendConnector.backend && (!this.options.resources || this.options.partialBundledLanguages) && (!P(u, r) || f && !P(k, r)));
        }
        loadNamespaces(r, n) {
          const u = K();
          return this.options.ns ? (M(r) && (r = [r]), r.forEach((f) => {
            this.options.ns.indexOf(f) < 0 && this.options.ns.push(f);
          }), this.loadResources((f) => {
            u.resolve(), n && n(f);
          }), u) : (n && n(), Promise.resolve());
        }
        loadLanguages(r, n) {
          const u = K();
          M(r) && (r = [r]);
          const f = this.options.preload || [], k = r.filter((P) => f.indexOf(P) < 0 && this.services.languageUtils.isSupportedCode(P));
          return k.length ? (this.options.preload = f.concat(k), this.loadResources((P) => {
            u.resolve(), n && n(P);
          }), u) : (n && n(), Promise.resolve());
        }
        dir(r) {
          if (r || (r = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !r) return "rtl";
          const n = this.services && this.services.languageUtils || new R(Oe());
          return ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf(n.getLanguagePartFromCode(r)) > -1 || r.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
        }
        static createInstance() {
          return new Ve(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, arguments.length > 1 ? arguments[1] : void 0);
        }
        cloneInstance() {
          let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne;
          const u = r.forkResourceStore;
          u && delete r.forkResourceStore;
          const f = { ...this.options, ...r, isClone: !0 }, k = new Ve(f);
          return r.debug === void 0 && r.prefix === void 0 || (k.logger = k.logger.clone(r)), ["store", "services", "language"].forEach((P) => {
            k[P] = this[P];
          }), k.services = { ...this.services }, k.services.utils = { hasLoadedNamespace: k.hasLoadedNamespace.bind(k) }, u && (k.store = new ce(this.store.data, f), k.services.resourceStore = k.store), k.translator = new jt(k.services, f), k.translator.on("*", function(P) {
            for (var G = arguments.length, z = new Array(G > 1 ? G - 1 : 0), X = 1; X < G; X++) z[X - 1] = arguments[X];
            k.emit(P, ...z);
          }), k.init(f, n), k.translator.options = f, k.translator.backendConnector.services.utils = { hasLoadedNamespace: k.hasLoadedNamespace.bind(k) }, k;
        }
        toJSON() {
          return { options: this.options, store: this.store, language: this.language, languages: this.languages, resolvedLanguage: this.resolvedLanguage };
        }
      }
      const He = Ve.createInstance();
      He.createInstance = Ve.createInstance, d.exports = He;
    }, 327(d, M) {
      Object.defineProperty(M, "__esModule", { value: !0 });
      class K extends Error {
      }
      class Pt extends K {
        constructor(t) {
          super(`Invalid DateTime: ${t.toMessage()}`);
        }
      }
      class pt extends K {
        constructor(t) {
          super(`Invalid Interval: ${t.toMessage()}`);
        }
      }
      class _t extends K {
        constructor(t) {
          super(`Invalid Duration: ${t.toMessage()}`);
        }
      }
      class Kt extends K {
      }
      class Ht extends K {
        constructor(t) {
          super(`Invalid unit ${t}`);
        }
      }
      class Ot extends K {
      }
      class Et extends K {
        constructor() {
          super("Zone is an abstract class");
        }
      }
      const Z = "numeric", kt = "short", Ut = "long", Wt = { year: Z, month: Z, day: Z }, Xt = { year: Z, month: kt, day: Z }, se = { year: Z, month: kt, day: Z, weekday: kt }, oe = { year: Z, month: Ut, day: Z }, qt = { year: Z, month: Ut, day: Z, weekday: Ut }, re = { hour: Z, minute: Z }, Tt = { hour: Z, minute: Z, second: Z }, At = { hour: Z, minute: Z, second: Z, timeZoneName: kt }, te = { hour: Z, minute: Z, second: Z, timeZoneName: Ut }, ce = { hour: Z, minute: Z, hourCycle: "h23" }, Ct = { hour: Z, minute: Z, second: Z, hourCycle: "h23" }, mt = { hour: Z, minute: Z, second: Z, hourCycle: "h23", timeZoneName: kt }, jt = { hour: Z, minute: Z, second: Z, hourCycle: "h23", timeZoneName: Ut }, A = { year: Z, month: Z, day: Z, hour: Z, minute: Z }, R = { year: Z, month: Z, day: Z, hour: Z, minute: Z, second: Z }, N = { year: Z, month: kt, day: Z, hour: Z, minute: Z }, C = { year: Z, month: kt, day: Z, hour: Z, minute: Z, second: Z }, V = { year: Z, month: kt, day: Z, weekday: kt, hour: Z, minute: Z }, m = { year: Z, month: Ut, day: Z, hour: Z, minute: Z, timeZoneName: kt }, D = { year: Z, month: Ut, day: Z, hour: Z, minute: Z, second: Z, timeZoneName: kt }, dt = { year: Z, month: Ut, day: Z, weekday: Ut, hour: Z, minute: Z, timeZoneName: Ut }, yt = { year: Z, month: Ut, day: Z, weekday: Ut, hour: Z, minute: Z, second: Z, timeZoneName: Ut };
      class at {
        get type() {
          throw new Et();
        }
        get name() {
          throw new Et();
        }
        get ianaName() {
          return this.name;
        }
        get isUniversal() {
          throw new Et();
        }
        offsetName(t, i) {
          throw new Et();
        }
        formatOffset(t, i) {
          throw new Et();
        }
        offset(t) {
          throw new Et();
        }
        equals(t) {
          throw new Et();
        }
        get isValid() {
          throw new Et();
        }
      }
      let j = null;
      class E extends at {
        static get instance() {
          return j === null && (j = new E()), j;
        }
        get type() {
          return "system";
        }
        get name() {
          return new Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        get isUniversal() {
          return !1;
        }
        offsetName(t, { format: i, locale: a }) {
          return wt(t, i, a);
        }
        formatOffset(t, i) {
          return ot(this.offset(t), i);
        }
        offset(t) {
          return -new Date(t).getTimezoneOffset();
        }
        equals(t) {
          return t.type === "system";
        }
        get isValid() {
          return !0;
        }
      }
      let q = {};
      const Y = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
      let Oe = {};
      class be extends at {
        static create(t) {
          return Oe[t] || (Oe[t] = new be(t)), Oe[t];
        }
        static resetCache() {
          Oe = {}, q = {};
        }
        static isValidSpecifier(t) {
          return this.isValidZone(t);
        }
        static isValidZone(t) {
          if (!t) return !1;
          try {
            return new Intl.DateTimeFormat("en-US", { timeZone: t }).format(), !0;
          } catch {
            return !1;
          }
        }
        constructor(t) {
          super(), this.zoneName = t, this.valid = be.isValidZone(t);
        }
        get type() {
          return "iana";
        }
        get name() {
          return this.zoneName;
        }
        get isUniversal() {
          return !1;
        }
        offsetName(t, { format: i, locale: a }) {
          return wt(t, i, a, this.name);
        }
        formatOffset(t, i) {
          return ot(this.offset(t), i);
        }
        offset(t) {
          const i = new Date(t);
          if (isNaN(i)) return NaN;
          const a = (g = this.name, q[g] || (q[g] = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: g, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", era: "short" })), q[g]);
          var g;
          let [O, L, W, et, vt, Gt, Mt] = a.formatToParts ? function(zt, Ae) {
            const Se = zt.formatToParts(Ae), Ie = [];
            for (let Pe = 0; Pe < Se.length; Pe++) {
              const { type: Ze, value: De } = Se[Pe], Me = Y[Ze];
              Ze === "era" ? Ie[Me] = De : Yt(Me) || (Ie[Me] = parseInt(De, 10));
            }
            return Ie;
          }(a, i) : function(zt, Ae) {
            const Se = zt.format(Ae).replace(/\u200E/g, ""), Ie = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(Se), [, Pe, Ze, De, Me, tn, Ln, sn] = Ie;
            return [De, Pe, Ze, Me, tn, Ln, sn];
          }(a, i);
          et === "BC" && (O = 1 - Math.abs(O));
          let ee = +i;
          const ie = ee % 1e3;
          return ee -= ie >= 0 ? ie : 1e3 + ie, (s({ year: O, month: L, day: W, hour: vt === 24 ? 0 : vt, minute: Gt, second: Mt, millisecond: 0 }) - ee) / 6e4;
        }
        equals(t) {
          return t.type === "iana" && t.name === this.name;
        }
        get isValid() {
          return this.valid;
        }
      }
      let Ne = {}, Ve = {};
      function He(l, t = {}) {
        const i = JSON.stringify([l, t]);
        let a = Ve[i];
        return a || (a = new Intl.DateTimeFormat(l, t), Ve[i] = a), a;
      }
      let S = {}, r = {}, n = null, u = {};
      function f(l, t, i, a) {
        const g = l.listingMode();
        return g === "error" ? null : g === "en" ? i(t) : a(t);
      }
      class k {
        constructor(t, i, a) {
          this.padTo = a.padTo || 0, this.floor = a.floor || !1;
          const { padTo: g, floor: O, ...L } = a;
          if (!i || Object.keys(L).length > 0) {
            const W = { useGrouping: !1, ...a };
            a.padTo > 0 && (W.minimumIntegerDigits = a.padTo), this.inf = function(et, vt = {}) {
              const Gt = JSON.stringify([et, vt]);
              let Mt = S[Gt];
              return Mt || (Mt = new Intl.NumberFormat(et, vt), S[Gt] = Mt), Mt;
            }(t, W);
          }
        }
        format(t) {
          if (this.inf) {
            const i = this.floor ? Math.floor(t) : t;
            return this.inf.format(i);
          }
          return Re(this.floor ? Math.floor(t) : fn(t, 3), this.padTo);
        }
      }
      class P {
        constructor(t, i, a) {
          let g;
          if (this.opts = a, this.originalZone = void 0, this.opts.timeZone) this.dt = t;
          else if (t.zone.type === "fixed") {
            const L = t.offset / 60 * -1, W = L >= 0 ? `Etc/GMT+${L}` : `Etc/GMT${L}`;
            t.offset !== 0 && be.create(W).valid ? (g = W, this.dt = t) : (g = "UTC", this.dt = t.offset === 0 ? t : t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
          } else t.zone.type === "system" ? this.dt = t : t.zone.type === "iana" ? (this.dt = t, g = t.zone.name) : (g = "UTC", this.dt = t.setZone("UTC").plus({ minutes: t.offset }), this.originalZone = t.zone);
          const O = { ...this.opts };
          O.timeZone = O.timeZone || g, this.dtf = He(i, O);
        }
        format() {
          return this.originalZone ? this.formatToParts().map(({ value: t }) => t).join("") : this.dtf.format(this.dt.toJSDate());
        }
        formatToParts() {
          const t = this.dtf.formatToParts(this.dt.toJSDate());
          return this.originalZone ? t.map((i) => {
            if (i.type === "timeZoneName") {
              const a = this.originalZone.offsetName(this.dt.ts, { locale: this.dt.locale, format: this.opts.timeZoneName });
              return { ...i, value: a };
            }
            return i;
          }) : t;
        }
        resolvedOptions() {
          return this.dtf.resolvedOptions();
        }
      }
      class G {
        constructor(t, i, a) {
          this.opts = { style: "long", ...a }, !i && On() && (this.rtf = function(g, O = {}) {
            const { base: L, ...W } = O, et = JSON.stringify([g, W]);
            let vt = r[et];
            return vt || (vt = new Intl.RelativeTimeFormat(g, O), r[et] = vt), vt;
          }(t, a));
        }
        format(t, i) {
          return this.rtf ? this.rtf.format(t, i) : function(a, g, O = "always", L = !1) {
            const W = { years: ["year", "yr."], quarters: ["quarter", "qtr."], months: ["month", "mo."], weeks: ["week", "wk."], days: ["day", "day", "days"], hours: ["hour", "hr."], minutes: ["minute", "min."], seconds: ["second", "sec."] }, et = ["hours", "minutes", "seconds"].indexOf(a) === -1;
            if (O === "auto" && et) {
              const zt = a === "days";
              switch (g) {
                case 1:
                  return zt ? "tomorrow" : `next ${W[a][0]}`;
                case -1:
                  return zt ? "yesterday" : `last ${W[a][0]}`;
                case 0:
                  return zt ? "today" : `this ${W[a][0]}`;
              }
            }
            const vt = Object.is(g, -0) || g < 0, Gt = Math.abs(g), Mt = Gt === 1, ee = W[a], ie = L ? Mt ? ee[1] : ee[2] || ee[1] : Mt ? W[a][0] : a;
            return vt ? `${Gt} ${ie} ago` : `in ${Gt} ${ie}`;
          }(i, t, this.opts.numeric, this.opts.style !== "long");
        }
        formatToParts(t, i) {
          return this.rtf ? this.rtf.formatToParts(t, i) : [];
        }
      }
      const z = { firstDay: 1, minimalDays: 4, weekend: [6, 7] };
      class X {
        static fromOpts(t) {
          return X.create(t.locale, t.numberingSystem, t.outputCalendar, t.weekSettings, t.defaultToEN);
        }
        static create(t, i, a, g, O = !1) {
          const L = t || it.defaultLocale, W = L || (O ? "en-US" : n || (n = new Intl.DateTimeFormat().resolvedOptions().locale, n)), et = i || it.defaultNumberingSystem, vt = a || it.defaultOutputCalendar, Gt = Qe(g) || it.defaultWeekSettings;
          return new X(W, et, vt, Gt, L);
        }
        static resetCache() {
          n = null, Ve = {}, S = {}, r = {};
        }
        static fromObject({ locale: t, numberingSystem: i, outputCalendar: a, weekSettings: g } = {}) {
          return X.create(t, i, a, g);
        }
        constructor(t, i, a, g, O) {
          const [L, W, et] = function(vt) {
            const Gt = vt.indexOf("-x-");
            Gt !== -1 && (vt = vt.substring(0, Gt));
            const Mt = vt.indexOf("-u-");
            if (Mt === -1) return [vt];
            {
              let ee, ie;
              try {
                ee = He(vt).resolvedOptions(), ie = vt;
              } catch {
                const Ie = vt.substring(0, Mt);
                ee = He(Ie).resolvedOptions(), ie = Ie;
              }
              const { numberingSystem: zt, calendar: Ae } = ee;
              return [ie, zt, Ae];
            }
          }(t);
          this.locale = L, this.numberingSystem = i || W || null, this.outputCalendar = a || et || null, this.weekSettings = g, this.intl = function(vt, Gt, Mt) {
            return (Mt || Gt) && (vt.includes("-u-") || (vt += "-u"), Mt && (vt += `-ca-${Mt}`), Gt && (vt += `-nu-${Gt}`)), vt;
          }(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = O, this.fastNumbersCached = null;
        }
        get fastNumbers() {
          var t;
          return this.fastNumbersCached == null && (this.fastNumbersCached = (!(t = this).numberingSystem || t.numberingSystem === "latn") && (t.numberingSystem === "latn" || !t.locale || t.locale.startsWith("en") || new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem === "latn")), this.fastNumbersCached;
        }
        listingMode() {
          const t = this.isEnglish(), i = !(this.numberingSystem !== null && this.numberingSystem !== "latn" || this.outputCalendar !== null && this.outputCalendar !== "gregory");
          return t && i ? "en" : "intl";
        }
        clone(t) {
          return t && Object.getOwnPropertyNames(t).length !== 0 ? X.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, Qe(t.weekSettings) || this.weekSettings, t.defaultToEN || !1) : this;
        }
        redefaultToEN(t = {}) {
          return this.clone({ ...t, defaultToEN: !0 });
        }
        redefaultToSystem(t = {}) {
          return this.clone({ ...t, defaultToEN: !1 });
        }
        months(t, i = !1) {
          return f(this, t, Ye, () => {
            const a = i ? { month: t, day: "numeric" } : { month: t }, g = i ? "format" : "standalone";
            return this.monthsCache[g][t] || (this.monthsCache[g][t] = function(O) {
              const L = [];
              for (let W = 1; W <= 12; W++) {
                const et = le.utc(2009, W, 1);
                L.push(O(et));
              }
              return L;
            }((O) => this.extract(O, a, "month"))), this.monthsCache[g][t];
          });
        }
        weekdays(t, i = !1) {
          return f(this, t, xn, () => {
            const a = i ? { weekday: t, year: "numeric", month: "long", day: "numeric" } : { weekday: t }, g = i ? "format" : "standalone";
            return this.weekdaysCache[g][t] || (this.weekdaysCache[g][t] = function(O) {
              const L = [];
              for (let W = 1; W <= 7; W++) {
                const et = le.utc(2016, 11, 13 + W);
                L.push(O(et));
              }
              return L;
            }((O) => this.extract(O, a, "weekday"))), this.weekdaysCache[g][t];
          });
        }
        meridiems() {
          return f(this, void 0, () => _n, () => {
            if (!this.meridiemCache) {
              const t = { hour: "numeric", hourCycle: "h12" };
              this.meridiemCache = [le.utc(2016, 11, 13, 9), le.utc(2016, 11, 13, 19)].map((i) => this.extract(i, t, "dayperiod"));
            }
            return this.meridiemCache;
          });
        }
        eras(t) {
          return f(this, t, o, () => {
            const i = { era: t };
            return this.eraCache[t] || (this.eraCache[t] = [le.utc(-40, 1, 1), le.utc(2017, 1, 1)].map((a) => this.extract(a, i, "era"))), this.eraCache[t];
          });
        }
        extract(t, i, a) {
          const g = this.dtFormatter(t, i).formatToParts().find((O) => O.type.toLowerCase() === a);
          return g ? g.value : null;
        }
        numberFormatter(t = {}) {
          return new k(this.intl, t.forceSimple || this.fastNumbers, t);
        }
        dtFormatter(t, i = {}) {
          return new P(t, this.intl, i);
        }
        relFormatter(t = {}) {
          return new G(this.intl, this.isEnglish(), t);
        }
        listFormatter(t = {}) {
          return function(i, a = {}) {
            const g = JSON.stringify([i, a]);
            let O = Ne[g];
            return O || (O = new Intl.ListFormat(i, a), Ne[g] = O), O;
          }(this.intl, t);
        }
        isEnglish() {
          return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
        }
        getWeekSettings() {
          return this.weekSettings ? this.weekSettings : vn() ? function(t) {
            let i = u[t];
            if (!i) {
              const a = new Intl.Locale(t);
              i = "getWeekInfo" in a ? a.getWeekInfo() : a.weekInfo, u[t] = i;
            }
            return i;
          }(this.locale) : z;
        }
        getStartOfWeek() {
          return this.getWeekSettings().firstDay;
        }
        getMinDaysInFirstWeek() {
          return this.getWeekSettings().minimalDays;
        }
        getWeekendDays() {
          return this.getWeekSettings().weekend;
        }
        equals(t) {
          return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar;
        }
      }
      let lt = null;
      class ct extends at {
        static get utcInstance() {
          return lt === null && (lt = new ct(0)), lt;
        }
        static instance(t) {
          return t === 0 ? ct.utcInstance : new ct(t);
        }
        static parseSpecifier(t) {
          if (t) {
            const i = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (i) return new ct(St(i[1], i[2]));
          }
          return null;
        }
        constructor(t) {
          super(), this.fixed = t;
        }
        get type() {
          return "fixed";
        }
        get name() {
          return this.fixed === 0 ? "UTC" : `UTC${ot(this.fixed, "narrow")}`;
        }
        get ianaName() {
          return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${ot(-this.fixed, "narrow")}`;
        }
        offsetName() {
          return this.name;
        }
        formatOffset(t, i) {
          return ot(this.fixed, i);
        }
        get isUniversal() {
          return !0;
        }
        offset() {
          return this.fixed;
        }
        equals(t) {
          return t.type === "fixed" && t.fixed === this.fixed;
        }
        get isValid() {
          return !0;
        }
      }
      class Q extends at {
        constructor(t) {
          super(), this.zoneName = t;
        }
        get type() {
          return "invalid";
        }
        get name() {
          return this.zoneName;
        }
        get isUniversal() {
          return !1;
        }
        offsetName() {
          return null;
        }
        formatOffset() {
          return "";
        }
        offset() {
          return NaN;
        }
        equals() {
          return !1;
        }
        get isValid() {
          return !1;
        }
      }
      function Jt(l, t) {
        if (Yt(l) || l === null) return t;
        if (l instanceof at) return l;
        if (typeof l == "string") {
          const i = l.toLowerCase();
          return i === "default" ? t : i === "local" || i === "system" ? E.instance : i === "utc" || i === "gmt" ? ct.utcInstance : ct.parseSpecifier(i) || be.create(l);
        }
        return $e(l) ? ct.instance(l) : typeof l == "object" && "offset" in l && typeof l.offset == "function" ? l : new Q(l);
      }
      let Qt, we = () => Date.now(), Te = "system", Fe = null, de = null, J = null, b = 60, nt = null;
      class it {
        static get now() {
          return we;
        }
        static set now(t) {
          we = t;
        }
        static set defaultZone(t) {
          Te = t;
        }
        static get defaultZone() {
          return Jt(Te, E.instance);
        }
        static get defaultLocale() {
          return Fe;
        }
        static set defaultLocale(t) {
          Fe = t;
        }
        static get defaultNumberingSystem() {
          return de;
        }
        static set defaultNumberingSystem(t) {
          de = t;
        }
        static get defaultOutputCalendar() {
          return J;
        }
        static set defaultOutputCalendar(t) {
          J = t;
        }
        static get defaultWeekSettings() {
          return nt;
        }
        static set defaultWeekSettings(t) {
          nt = Qe(t);
        }
        static get twoDigitCutoffYear() {
          return b;
        }
        static set twoDigitCutoffYear(t) {
          b = t % 100;
        }
        static get throwOnInvalid() {
          return Qt;
        }
        static set throwOnInvalid(t) {
          Qt = t;
        }
        static resetCaches() {
          X.resetCache(), be.resetCache();
        }
      }
      class st {
        constructor(t, i) {
          this.reason = t, this.explanation = i;
        }
        toMessage() {
          return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
        }
      }
      const ht = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], It = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
      function T(l, t) {
        return new st("unit out of range", `you specified ${t} (of type ${typeof t}) as a ${l}, which is invalid`);
      }
      function x(l, t, i) {
        const a = new Date(Date.UTC(l, t - 1, i));
        l < 100 && l >= 0 && a.setUTCFullYear(a.getUTCFullYear() - 1900);
        const g = a.getUTCDay();
        return g === 0 ? 7 : g;
      }
      function U(l, t, i) {
        return i + (bn(l) ? It : ht)[t - 1];
      }
      function $(l, t) {
        const i = bn(l) ? It : ht, a = i.findIndex((g) => g < t);
        return { month: a + 1, day: t - i[a] };
      }
      function H(l, t) {
        return (l - t + 7) % 7 + 1;
      }
      function rt(l, t = 4, i = 1) {
        const { year: a, month: g, day: O } = l, L = U(a, g, O), W = H(x(a, g, O), i);
        let et, vt = Math.floor((L - W + 14 - t) / 7);
        return vt < 1 ? (et = a - 1, vt = c(et, t, i)) : vt > c(a, t, i) ? (et = a + 1, vt = 1) : et = a, { weekYear: et, weekNumber: vt, weekday: W, ...ne(l) };
      }
      function Nt(l, t = 4, i = 1) {
        const { weekYear: a, weekNumber: g, weekday: O } = l, L = H(x(a, 1, t), i), W = p(a);
        let et, vt = 7 * g + O - L - 7 + t;
        vt < 1 ? (et = a - 1, vt += p(et)) : vt > W ? (et = a + 1, vt -= p(a)) : et = a;
        const { month: Gt, day: Mt } = $(et, vt);
        return { year: et, month: Gt, day: Mt, ...ne(l) };
      }
      function Bt(l) {
        const { year: t, month: i, day: a } = l;
        return { year: t, ordinal: U(t, i, a), ...ne(l) };
      }
      function Ee(l) {
        const { year: t, ordinal: i } = l, { month: a, day: g } = $(t, i);
        return { year: t, month: a, day: g, ...ne(l) };
      }
      function me(l, t) {
        if (!Yt(l.localWeekday) || !Yt(l.localWeekNumber) || !Yt(l.localWeekYear)) {
          if (!Yt(l.weekday) || !Yt(l.weekNumber) || !Yt(l.weekYear)) throw new Kt("Cannot mix locale-based week fields with ISO-based week fields");
          return Yt(l.localWeekday) || (l.weekday = l.localWeekday), Yt(l.localWeekNumber) || (l.weekNumber = l.localWeekNumber), Yt(l.localWeekYear) || (l.weekYear = l.localWeekYear), delete l.localWeekday, delete l.localWeekNumber, delete l.localWeekYear, { minDaysInFirstWeek: t.getMinDaysInFirstWeek(), startOfWeek: t.getStartOfWeek() };
        }
        return { minDaysInFirstWeek: 4, startOfWeek: 1 };
      }
      function he(l) {
        const t = on(l.year), i = Ke(l.month, 1, 12), a = Ke(l.day, 1, e(l.year, l.month));
        return t ? i ? !a && T("day", l.day) : T("month", l.month) : T("year", l.year);
      }
      function Xe(l) {
        const { hour: t, minute: i, second: a, millisecond: g } = l, O = Ke(t, 0, 23) || t === 24 && i === 0 && a === 0 && g === 0, L = Ke(i, 0, 59), W = Ke(a, 0, 59), et = Ke(g, 0, 999);
        return O ? L ? W ? !et && T("millisecond", g) : T("second", a) : T("minute", i) : T("hour", t);
      }
      function Yt(l) {
        return l === void 0;
      }
      function $e(l) {
        return typeof l == "number";
      }
      function on(l) {
        return typeof l == "number" && l % 1 == 0;
      }
      function On() {
        try {
          return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
        } catch {
          return !1;
        }
      }
      function vn() {
        try {
          return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
        } catch {
          return !1;
        }
      }
      function yn(l, t, i) {
        if (l.length !== 0) return l.reduce((a, g) => {
          const O = [t(g), g];
          return a && i(a[0], O[0]) === a[0] ? a : O;
        }, null)[1];
      }
      function hn(l, t) {
        return Object.prototype.hasOwnProperty.call(l, t);
      }
      function Qe(l) {
        if (l == null) return null;
        if (typeof l != "object") throw new Ot("Week settings must be an object");
        if (!Ke(l.firstDay, 1, 7) || !Ke(l.minimalDays, 1, 7) || !Array.isArray(l.weekend) || l.weekend.some((t) => !Ke(t, 1, 7))) throw new Ot("Invalid week settings");
        return { firstDay: l.firstDay, minimalDays: l.minimalDays, weekend: Array.from(l.weekend) };
      }
      function Ke(l, t, i) {
        return on(l) && l >= t && l <= i;
      }
      function Re(l, t = 2) {
        let i;
        return i = l < 0 ? "-" + ("" + -l).padStart(t, "0") : ("" + l).padStart(t, "0"), i;
      }
      function an(l) {
        return Yt(l) || l === null || l === "" ? void 0 : parseInt(l, 10);
      }
      function ln(l) {
        return Yt(l) || l === null || l === "" ? void 0 : parseFloat(l);
      }
      function Tn(l) {
        if (!Yt(l) && l !== null && l !== "") {
          const t = 1e3 * parseFloat("0." + l);
          return Math.floor(t);
        }
      }
      function fn(l, t, i = !1) {
        const a = 10 ** t;
        return (i ? Math.trunc : Math.round)(l * a) / a;
      }
      function bn(l) {
        return l % 4 == 0 && (l % 100 != 0 || l % 400 == 0);
      }
      function p(l) {
        return bn(l) ? 366 : 365;
      }
      function e(l, t) {
        const i = (a = t - 1) - 12 * Math.floor(a / 12) + 1;
        var a;
        return i === 2 ? bn(l + (t - i) / 12) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i - 1];
      }
      function s(l) {
        let t = Date.UTC(l.year, l.month - 1, l.day, l.hour, l.minute, l.second, l.millisecond);
        return l.year < 100 && l.year >= 0 && (t = new Date(t), t.setUTCFullYear(l.year, l.month - 1, l.day)), +t;
      }
      function w(l, t, i) {
        return -H(x(l, 1, t), i) + t - 1;
      }
      function c(l, t = 4, i = 1) {
        const a = w(l, t, i), g = w(l + 1, t, i);
        return (p(l) - a + g) / 7;
      }
      function I(l) {
        return l > 99 ? l : l > it.twoDigitCutoffYear ? 1900 + l : 2e3 + l;
      }
      function wt(l, t, i, a = null) {
        const g = new Date(l), O = { hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
        a && (O.timeZone = a);
        const L = { timeZoneName: t, ...O }, W = new Intl.DateTimeFormat(i, L).formatToParts(g).find((et) => et.type.toLowerCase() === "timezonename");
        return W ? W.value : null;
      }
      function St(l, t) {
        let i = parseInt(l, 10);
        Number.isNaN(i) && (i = 0);
        const a = parseInt(t, 10) || 0;
        return 60 * i + (i < 0 || Object.is(i, -0) ? -a : a);
      }
      function Lt(l) {
        const t = Number(l);
        if (typeof l == "boolean" || l === "" || Number.isNaN(t)) throw new Ot(`Invalid unit value ${l}`);
        return t;
      }
      function ut(l, t) {
        const i = {};
        for (const a in l) if (hn(l, a)) {
          const g = l[a];
          if (g == null) continue;
          i[t(a)] = Lt(g);
        }
        return i;
      }
      function ot(l, t) {
        const i = Math.trunc(Math.abs(l / 60)), a = Math.trunc(Math.abs(l % 60)), g = l >= 0 ? "+" : "-";
        switch (t) {
          case "short":
            return `${g}${Re(i, 2)}:${Re(a, 2)}`;
          case "narrow":
            return `${g}${i}${a > 0 ? `:${a}` : ""}`;
          case "techie":
            return `${g}${Re(i, 2)}${Re(a, 2)}`;
          default:
            throw new RangeError(`Value format ${t} is out of range for property format`);
        }
      }
      function ne(l) {
        return function(t) {
          return ["hour", "minute", "second", "millisecond"].reduce((i, a) => (i[a] = t[a], i), {});
        }(l);
      }
      const pe = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ve = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], xe = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
      function Ye(l) {
        switch (l) {
          case "narrow":
            return [...xe];
          case "short":
            return [...ve];
          case "long":
            return [...pe];
          case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
          case "2-digit":
            return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
          default:
            return null;
        }
      }
      const We = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], en = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], cn = ["M", "T", "W", "T", "F", "S", "S"];
      function xn(l) {
        switch (l) {
          case "narrow":
            return [...cn];
          case "short":
            return [...en];
          case "long":
            return [...We];
          case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7"];
          default:
            return null;
        }
      }
      const _n = ["AM", "PM"], Dn = ["Before Christ", "Anno Domini"], Bn = ["BC", "AD"], Le = ["B", "A"];
      function o(l) {
        switch (l) {
          case "narrow":
            return [...Le];
          case "short":
            return [...Bn];
          case "long":
            return [...Dn];
          default:
            return null;
        }
      }
      function h(l, t) {
        let i = "";
        for (const a of l) a.literal ? i += a.val : i += t(a.val);
        return i;
      }
      const y = { D: Wt, DD: Xt, DDD: oe, DDDD: qt, t: re, tt: Tt, ttt: At, tttt: te, T: ce, TT: Ct, TTT: mt, TTTT: jt, f: A, ff: N, fff: m, ffff: dt, F: R, FF: C, FFF: D, FFFF: yt };
      class v {
        static create(t, i = {}) {
          return new v(t, i);
        }
        static parseFormat(t) {
          let i = null, a = "", g = !1;
          const O = [];
          for (let L = 0; L < t.length; L++) {
            const W = t.charAt(L);
            W === "'" ? (a.length > 0 && O.push({ literal: g || /^\s+$/.test(a), val: a }), i = null, a = "", g = !g) : g || W === i ? a += W : (a.length > 0 && O.push({ literal: /^\s+$/.test(a), val: a }), a = W, i = W);
          }
          return a.length > 0 && O.push({ literal: g || /^\s+$/.test(a), val: a }), O;
        }
        static macroTokenToFormatOpts(t) {
          return y[t];
        }
        constructor(t, i) {
          this.opts = i, this.loc = t, this.systemLoc = null;
        }
        formatWithSystemDefault(t, i) {
          return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(t, { ...this.opts, ...i }).format();
        }
        dtFormatter(t, i = {}) {
          return this.loc.dtFormatter(t, { ...this.opts, ...i });
        }
        formatDateTime(t, i) {
          return this.dtFormatter(t, i).format();
        }
        formatDateTimeParts(t, i) {
          return this.dtFormatter(t, i).formatToParts();
        }
        formatInterval(t, i) {
          return this.dtFormatter(t.start, i).dtf.formatRange(t.start.toJSDate(), t.end.toJSDate());
        }
        resolvedOptions(t, i) {
          return this.dtFormatter(t, i).resolvedOptions();
        }
        num(t, i = 0) {
          if (this.opts.forceSimple) return Re(t, i);
          const a = { ...this.opts };
          return i > 0 && (a.padTo = i), this.loc.numberFormatter(a).format(t);
        }
        formatDateTimeFromString(t, i) {
          const a = this.loc.listingMode() === "en", g = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", O = (Mt, ee) => this.loc.extract(t, Mt, ee), L = (Mt) => t.isOffsetFixed && t.offset === 0 && Mt.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, Mt.format) : "", W = (Mt, ee) => a ? function(ie, zt) {
            return Ye(zt)[ie.month - 1];
          }(t, Mt) : O(ee ? { month: Mt } : { month: Mt, day: "numeric" }, "month"), et = (Mt, ee) => a ? function(ie, zt) {
            return xn(zt)[ie.weekday - 1];
          }(t, Mt) : O(ee ? { weekday: Mt } : { weekday: Mt, month: "long", day: "numeric" }, "weekday"), vt = (Mt) => {
            const ee = v.macroTokenToFormatOpts(Mt);
            return ee ? this.formatWithSystemDefault(t, ee) : Mt;
          }, Gt = (Mt) => a ? function(ee, ie) {
            return o(ie)[ee.year < 0 ? 0 : 1];
          }(t, Mt) : O({ era: Mt }, "era");
          return h(v.parseFormat(i), (Mt) => {
            switch (Mt) {
              case "S":
                return this.num(t.millisecond);
              case "u":
              case "SSS":
                return this.num(t.millisecond, 3);
              case "s":
                return this.num(t.second);
              case "ss":
                return this.num(t.second, 2);
              case "uu":
                return this.num(Math.floor(t.millisecond / 10), 2);
              case "uuu":
                return this.num(Math.floor(t.millisecond / 100));
              case "m":
                return this.num(t.minute);
              case "mm":
                return this.num(t.minute, 2);
              case "h":
                return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12);
              case "hh":
                return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12, 2);
              case "H":
                return this.num(t.hour);
              case "HH":
                return this.num(t.hour, 2);
              case "Z":
                return L({ format: "narrow", allowZ: this.opts.allowZ });
              case "ZZ":
                return L({ format: "short", allowZ: this.opts.allowZ });
              case "ZZZ":
                return L({ format: "techie", allowZ: this.opts.allowZ });
              case "ZZZZ":
                return t.zone.offsetName(t.ts, { format: "short", locale: this.loc.locale });
              case "ZZZZZ":
                return t.zone.offsetName(t.ts, { format: "long", locale: this.loc.locale });
              case "z":
                return t.zoneName;
              case "a":
                return a ? function(ee) {
                  return _n[ee.hour < 12 ? 0 : 1];
                }(t) : O({ hour: "numeric", hourCycle: "h12" }, "dayperiod");
              case "d":
                return g ? O({ day: "numeric" }, "day") : this.num(t.day);
              case "dd":
                return g ? O({ day: "2-digit" }, "day") : this.num(t.day, 2);
              case "c":
              case "E":
                return this.num(t.weekday);
              case "ccc":
                return et("short", !0);
              case "cccc":
                return et("long", !0);
              case "ccccc":
                return et("narrow", !0);
              case "EEE":
                return et("short", !1);
              case "EEEE":
                return et("long", !1);
              case "EEEEE":
                return et("narrow", !1);
              case "L":
                return g ? O({ month: "numeric", day: "numeric" }, "month") : this.num(t.month);
              case "LL":
                return g ? O({ month: "2-digit", day: "numeric" }, "month") : this.num(t.month, 2);
              case "LLL":
                return W("short", !0);
              case "LLLL":
                return W("long", !0);
              case "LLLLL":
                return W("narrow", !0);
              case "M":
                return g ? O({ month: "numeric" }, "month") : this.num(t.month);
              case "MM":
                return g ? O({ month: "2-digit" }, "month") : this.num(t.month, 2);
              case "MMM":
                return W("short", !1);
              case "MMMM":
                return W("long", !1);
              case "MMMMM":
                return W("narrow", !1);
              case "y":
                return g ? O({ year: "numeric" }, "year") : this.num(t.year);
              case "yy":
                return g ? O({ year: "2-digit" }, "year") : this.num(t.year.toString().slice(-2), 2);
              case "yyyy":
                return g ? O({ year: "numeric" }, "year") : this.num(t.year, 4);
              case "yyyyyy":
                return g ? O({ year: "numeric" }, "year") : this.num(t.year, 6);
              case "G":
                return Gt("short");
              case "GG":
                return Gt("long");
              case "GGGGG":
                return Gt("narrow");
              case "kk":
                return this.num(t.weekYear.toString().slice(-2), 2);
              case "kkkk":
                return this.num(t.weekYear, 4);
              case "W":
                return this.num(t.weekNumber);
              case "WW":
                return this.num(t.weekNumber, 2);
              case "n":
                return this.num(t.localWeekNumber);
              case "nn":
                return this.num(t.localWeekNumber, 2);
              case "ii":
                return this.num(t.localWeekYear.toString().slice(-2), 2);
              case "iiii":
                return this.num(t.localWeekYear, 4);
              case "o":
                return this.num(t.ordinal);
              case "ooo":
                return this.num(t.ordinal, 3);
              case "q":
                return this.num(t.quarter);
              case "qq":
                return this.num(t.quarter, 2);
              case "X":
                return this.num(Math.floor(t.ts / 1e3));
              case "x":
                return this.num(t.ts);
              default:
                return vt(Mt);
            }
          });
        }
        formatDurationFromString(t, i) {
          const a = (L) => {
            switch (L[0]) {
              case "S":
                return "millisecond";
              case "s":
                return "second";
              case "m":
                return "minute";
              case "h":
                return "hour";
              case "d":
                return "day";
              case "w":
                return "week";
              case "M":
                return "month";
              case "y":
                return "year";
              default:
                return null;
            }
          }, g = v.parseFormat(i), O = g.reduce((L, { literal: W, val: et }) => W ? L : L.concat(et), []);
          return h(g, /* @__PURE__ */ ((L) => (W) => {
            const et = a(W);
            return et ? this.num(L.get(et), W.length) : W;
          })(t.shiftTo(...O.map(a).filter((L) => L))));
        }
      }
      const _ = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
      function B(...l) {
        const t = l.reduce((i, a) => i + a.source, "");
        return RegExp(`^${t}$`);
      }
      function F(...l) {
        return (t) => l.reduce(([i, a, g], O) => {
          const [L, W, et] = O(t, g);
          return [{ ...i, ...L }, W || a, et];
        }, [{}, null, 1]).slice(0, 2);
      }
      function tt(l, ...t) {
        if (l == null) return [null, null];
        for (const [i, a] of t) {
          const g = i.exec(l);
          if (g) return a(g);
        }
        return [null, null];
      }
      function ft(...l) {
        return (t, i) => {
          const a = {};
          let g;
          for (g = 0; g < l.length; g++) a[l[g]] = an(t[i + g]);
          return [a, null, i + g];
        };
      }
      const gt = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, bt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Ft = RegExp(`${bt.source}(?:${gt.source}?(?:\\[(${_.source})\\])?)?`), xt = RegExp(`(?:T${Ft.source})?`), $t = ft("weekYear", "weekNumber", "weekDay"), Zt = ft("year", "ordinal"), Vt = RegExp(`${bt.source} ?(?:${gt.source}|(${_.source}))?`), ue = RegExp(`(?: ${Vt.source})?`);
      function Be(l, t, i) {
        const a = l[t];
        return Yt(a) ? i : an(a);
      }
      function ye(l, t) {
        return [{ hours: Be(l, t, 0), minutes: Be(l, t + 1, 0), seconds: Be(l, t + 2, 0), milliseconds: Tn(l[t + 3]) }, null, t + 4];
      }
      function ze(l, t) {
        const i = !l[t] && !l[t + 1], a = St(l[t + 1], l[t + 2]);
        return [{}, i ? null : ct.instance(a), t + 3];
      }
      function un(l, t) {
        return [{}, l[t] ? be.create(l[t]) : null, t + 1];
      }
      const Kn = RegExp(`^T?${bt.source}$`), En = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
      function zn(l) {
        const [t, i, a, g, O, L, W, et, vt] = l, Gt = t[0] === "-", Mt = et && et[0] === "-", ee = (ie, zt = !1) => ie !== void 0 && (zt || ie && Gt) ? -ie : ie;
        return [{ years: ee(ln(i)), months: ee(ln(a)), weeks: ee(ln(g)), days: ee(ln(O)), hours: ee(ln(L)), minutes: ee(ln(W)), seconds: ee(ln(et), et === "-0"), milliseconds: ee(Tn(vt), Mt) }];
      }
      const jn = { GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
      function qn(l, t, i, a, g, O, L) {
        const W = { year: t.length === 2 ? I(an(t)) : an(t), month: ve.indexOf(i) + 1, day: an(a), hour: an(g), minute: an(O) };
        return L && (W.second = an(L)), l && (W.weekday = l.length > 3 ? We.indexOf(l) + 1 : en.indexOf(l) + 1), W;
      }
      const Yn = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
      function Fn(l) {
        const [, t, i, a, g, O, L, W, et, vt, Gt, Mt] = l, ee = qn(t, g, a, i, O, L, W);
        let ie;
        return ie = et ? jn[et] : vt ? 0 : St(Gt, Mt), [ee, new ct(ie)];
      }
      const Un = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, In = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, Xn = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
      function nn(l) {
        const [, t, i, a, g, O, L, W] = l;
        return [qn(t, g, a, i, O, L, W), ct.utcInstance];
      }
      function Qn(l) {
        const [, t, i, a, g, O, L, W] = l;
        return [qn(t, W, i, a, g, O, L), ct.utcInstance];
      }
      const wn = B(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, xt), ti = B(/(\d{4})-?W(\d\d)(?:-?(\d))?/, xt), ai = B(/(\d{4})-?(\d{3})/, xt), gn = B(Ft), dn = F(function(l, t) {
        return [{ year: Be(l, t), month: Be(l, t + 1, 1), day: Be(l, t + 2, 1) }, null, t + 3];
      }, ye, ze, un), Rn = F($t, ye, ze, un), Je = F(Zt, ye, ze, un), Hn = F(ye, ze, un), _i = F(ye), ji = B(/(\d{4})-(\d\d)-(\d\d)/, ue), qi = B(Vt), Fi = F(ye, ze, un), gi = "Invalid Duration", mi = { weeks: { days: 7, hours: 168, minutes: 10080, seconds: 604800, milliseconds: 6048e5 }, days: { hours: 24, minutes: 1440, seconds: 86400, milliseconds: 864e5 }, hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 }, minutes: { seconds: 60, milliseconds: 6e4 }, seconds: { milliseconds: 1e3 } }, $i = { years: { quarters: 4, months: 12, weeks: 52, days: 365, hours: 8760, minutes: 525600, seconds: 31536e3, milliseconds: 31536e6 }, quarters: { months: 3, weeks: 13, days: 91, hours: 2184, minutes: 131040, seconds: 7862400, milliseconds: 78624e5 }, months: { weeks: 4, days: 30, hours: 720, minutes: 43200, seconds: 2592e3, milliseconds: 2592e6 }, ...mi }, Bi = { years: { quarters: 4, months: 12, weeks: 52.1775, days: 365.2425, hours: 8765.82, minutes: 525949.2, seconds: 525949.2 * 60, milliseconds: 525949.2 * 60 * 1e3 }, quarters: { months: 3, weeks: 13.044375, days: 91.310625, hours: 2191.455, minutes: 131487.3, seconds: 525949.2 * 60 / 4, milliseconds: 7889237999999999e-6 }, months: { weeks: 4.3481250000000005, days: 30.436875, hours: 730.485, minutes: 43829.1, seconds: 2629746, milliseconds: 2629746e3 }, ...mi }, Pn = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"], zi = Pn.slice(0).reverse();
      function Nn(l, t, i = !1) {
        const a = { values: i ? t.values : { ...l.values, ...t.values || {} }, loc: l.loc.clone(t.loc), conversionAccuracy: t.conversionAccuracy || l.conversionAccuracy, matrix: t.matrix || l.matrix };
        return new ge(a);
      }
      function pi(l, t) {
        var i;
        let a = (i = t.milliseconds) != null ? i : 0;
        for (const g of zi.slice(1)) t[g] && (a += t[g] * l[g].milliseconds);
        return a;
      }
      function vi(l, t) {
        const i = pi(l, t) < 0 ? -1 : 1;
        Pn.reduceRight((a, g) => {
          if (Yt(t[g])) return a;
          if (a) {
            const O = t[a] * i, L = l[g][a], W = Math.floor(O / L);
            t[g] += W * i, t[a] -= W * L * i;
          }
          return g;
        }, null), Pn.reduce((a, g) => {
          if (Yt(t[g])) return a;
          if (a) {
            const O = t[a] % 1;
            t[a] -= O, t[g] += O * l[a][g];
          }
          return g;
        }, null);
      }
      class ge {
        constructor(t) {
          const i = t.conversionAccuracy === "longterm" || !1;
          let a = i ? Bi : $i;
          t.matrix && (a = t.matrix), this.values = t.values, this.loc = t.loc || X.create(), this.conversionAccuracy = i ? "longterm" : "casual", this.invalid = t.invalid || null, this.matrix = a, this.isLuxonDuration = !0;
        }
        static fromMillis(t, i) {
          return ge.fromObject({ milliseconds: t }, i);
        }
        static fromObject(t, i = {}) {
          if (t == null || typeof t != "object") throw new Ot("Duration.fromObject: argument expected to be an object, got " + (t === null ? "null" : typeof t));
          return new ge({ values: ut(t, ge.normalizeUnit), loc: X.fromObject(i), conversionAccuracy: i.conversionAccuracy, matrix: i.matrix });
        }
        static fromDurationLike(t) {
          if ($e(t)) return ge.fromMillis(t);
          if (ge.isDuration(t)) return t;
          if (typeof t == "object") return ge.fromObject(t);
          throw new Ot(`Unknown duration argument ${t} of type ${typeof t}`);
        }
        static fromISO(t, i) {
          const [a] = function(g) {
            return tt(g, [En, zn]);
          }(t);
          return a ? ge.fromObject(a, i) : ge.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
        }
        static fromISOTime(t, i) {
          const [a] = function(g) {
            return tt(g, [Kn, _i]);
          }(t);
          return a ? ge.fromObject(a, i) : ge.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
        }
        static invalid(t, i = null) {
          if (!t) throw new Ot("need to specify a reason the Duration is invalid");
          const a = t instanceof st ? t : new st(t, i);
          if (it.throwOnInvalid) throw new _t(a);
          return new ge({ invalid: a });
        }
        static normalizeUnit(t) {
          const i = { year: "years", years: "years", quarter: "quarters", quarters: "quarters", month: "months", months: "months", week: "weeks", weeks: "weeks", day: "days", days: "days", hour: "hours", hours: "hours", minute: "minutes", minutes: "minutes", second: "seconds", seconds: "seconds", millisecond: "milliseconds", milliseconds: "milliseconds" }[t && t.toLowerCase()];
          if (!i) throw new Ht(t);
          return i;
        }
        static isDuration(t) {
          return t && t.isLuxonDuration || !1;
        }
        get locale() {
          return this.isValid ? this.loc.locale : null;
        }
        get numberingSystem() {
          return this.isValid ? this.loc.numberingSystem : null;
        }
        toFormat(t, i = {}) {
          const a = { ...i, floor: i.round !== !1 && i.floor !== !1 };
          return this.isValid ? v.create(this.loc, a).formatDurationFromString(this, t) : gi;
        }
        toHuman(t = {}) {
          if (!this.isValid) return gi;
          const i = Pn.map((a) => {
            const g = this.values[a];
            return Yt(g) ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...t, unit: a.slice(0, -1) }).format(g);
          }).filter((a) => a);
          return this.loc.listFormatter({ type: "conjunction", style: t.listStyle || "narrow", ...t }).format(i);
        }
        toObject() {
          return this.isValid ? { ...this.values } : {};
        }
        toISO() {
          if (!this.isValid) return null;
          let t = "P";
          return this.years !== 0 && (t += this.years + "Y"), this.months === 0 && this.quarters === 0 || (t += this.months + 3 * this.quarters + "M"), this.weeks !== 0 && (t += this.weeks + "W"), this.days !== 0 && (t += this.days + "D"), this.hours === 0 && this.minutes === 0 && this.seconds === 0 && this.milliseconds === 0 || (t += "T"), this.hours !== 0 && (t += this.hours + "H"), this.minutes !== 0 && (t += this.minutes + "M"), this.seconds === 0 && this.milliseconds === 0 || (t += fn(this.seconds + this.milliseconds / 1e3, 3) + "S"), t === "P" && (t += "T0S"), t;
        }
        toISOTime(t = {}) {
          if (!this.isValid) return null;
          const i = this.toMillis();
          return i < 0 || i >= 864e5 ? null : (t = { suppressMilliseconds: !1, suppressSeconds: !1, includePrefix: !1, format: "extended", ...t, includeOffset: !1 }, le.fromMillis(i, { zone: "UTC" }).toISOTime(t));
        }
        toJSON() {
          return this.toISO();
        }
        toString() {
          return this.toISO();
        }
        [Symbol.for("nodejs.util.inspect.custom")]() {
          return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
        }
        toMillis() {
          return this.isValid ? pi(this.matrix, this.values) : NaN;
        }
        valueOf() {
          return this.toMillis();
        }
        plus(t) {
          if (!this.isValid) return this;
          const i = ge.fromDurationLike(t), a = {};
          for (const g of Pn) (hn(i.values, g) || hn(this.values, g)) && (a[g] = i.get(g) + this.get(g));
          return Nn(this, { values: a }, !0);
        }
        minus(t) {
          if (!this.isValid) return this;
          const i = ge.fromDurationLike(t);
          return this.plus(i.negate());
        }
        mapUnits(t) {
          if (!this.isValid) return this;
          const i = {};
          for (const a of Object.keys(this.values)) i[a] = Lt(t(this.values[a], a));
          return Nn(this, { values: i }, !0);
        }
        get(t) {
          return this[ge.normalizeUnit(t)];
        }
        set(t) {
          return this.isValid ? Nn(this, { values: { ...this.values, ...ut(t, ge.normalizeUnit) } }) : this;
        }
        reconfigure({ locale: t, numberingSystem: i, conversionAccuracy: a, matrix: g } = {}) {
          return Nn(this, { loc: this.loc.clone({ locale: t, numberingSystem: i }), matrix: g, conversionAccuracy: a });
        }
        as(t) {
          return this.isValid ? this.shiftTo(t).get(t) : NaN;
        }
        normalize() {
          if (!this.isValid) return this;
          const t = this.toObject();
          return vi(this.matrix, t), Nn(this, { values: t }, !0);
        }
        rescale() {
          return this.isValid ? Nn(this, { values: function(t) {
            const i = {};
            for (const [a, g] of Object.entries(t)) g !== 0 && (i[a] = g);
            return i;
          }(this.normalize().shiftToAll().toObject()) }, !0) : this;
        }
        shiftTo(...t) {
          if (!this.isValid) return this;
          if (t.length === 0) return this;
          t = t.map((L) => ge.normalizeUnit(L));
          const i = {}, a = {}, g = this.toObject();
          let O;
          for (const L of Pn) if (t.indexOf(L) >= 0) {
            O = L;
            let W = 0;
            for (const vt in a) W += this.matrix[vt][L] * a[vt], a[vt] = 0;
            $e(g[L]) && (W += g[L]);
            const et = Math.trunc(W);
            i[L] = et, a[L] = (1e3 * W - 1e3 * et) / 1e3;
          } else $e(g[L]) && (a[L] = g[L]);
          for (const L in a) a[L] !== 0 && (i[O] += L === O ? a[L] : a[L] / this.matrix[O][L]);
          return vi(this.matrix, i), Nn(this, { values: i }, !0);
        }
        shiftToAll() {
          return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
        }
        negate() {
          if (!this.isValid) return this;
          const t = {};
          for (const i of Object.keys(this.values)) t[i] = this.values[i] === 0 ? 0 : -this.values[i];
          return Nn(this, { values: t }, !0);
        }
        get years() {
          return this.isValid ? this.values.years || 0 : NaN;
        }
        get quarters() {
          return this.isValid ? this.values.quarters || 0 : NaN;
        }
        get months() {
          return this.isValid ? this.values.months || 0 : NaN;
        }
        get weeks() {
          return this.isValid ? this.values.weeks || 0 : NaN;
        }
        get days() {
          return this.isValid ? this.values.days || 0 : NaN;
        }
        get hours() {
          return this.isValid ? this.values.hours || 0 : NaN;
        }
        get minutes() {
          return this.isValid ? this.values.minutes || 0 : NaN;
        }
        get seconds() {
          return this.isValid ? this.values.seconds || 0 : NaN;
        }
        get milliseconds() {
          return this.isValid ? this.values.milliseconds || 0 : NaN;
        }
        get isValid() {
          return this.invalid === null;
        }
        get invalidReason() {
          return this.invalid ? this.invalid.reason : null;
        }
        get invalidExplanation() {
          return this.invalid ? this.invalid.explanation : null;
        }
        equals(t) {
          if (!this.isValid || !t.isValid || !this.loc.equals(t.loc)) return !1;
          function i(a, g) {
            return a === void 0 || a === 0 ? g === void 0 || g === 0 : a === g;
          }
          for (const a of Pn) if (!i(this.values[a], t.values[a])) return !1;
          return !0;
        }
      }
      const $n = "Invalid Interval";
      class Ue {
        constructor(t) {
          this.s = t.start, this.e = t.end, this.invalid = t.invalid || null, this.isLuxonInterval = !0;
        }
        static invalid(t, i = null) {
          if (!t) throw new Ot("need to specify a reason the Interval is invalid");
          const a = t instanceof st ? t : new st(t, i);
          if (it.throwOnInvalid) throw new pt(a);
          return new Ue({ invalid: a });
        }
        static fromDateTimes(t, i) {
          const a = Zn(t), g = Zn(i), O = function(L, W) {
            return L && L.isValid ? W && W.isValid ? W < L ? Ue.invalid("end before start", `The end of an interval must be after its start, but you had start=${L.toISO()} and end=${W.toISO()}`) : null : Ue.invalid("missing or invalid end") : Ue.invalid("missing or invalid start");
          }(a, g);
          return O ?? new Ue({ start: a, end: g });
        }
        static after(t, i) {
          const a = ge.fromDurationLike(i), g = Zn(t);
          return Ue.fromDateTimes(g, g.plus(a));
        }
        static before(t, i) {
          const a = ge.fromDurationLike(i), g = Zn(t);
          return Ue.fromDateTimes(g.minus(a), g);
        }
        static fromISO(t, i) {
          const [a, g] = (t || "").split("/", 2);
          if (a && g) {
            let O, L, W, et;
            try {
              O = le.fromISO(a, i), L = O.isValid;
            } catch {
              L = !1;
            }
            try {
              W = le.fromISO(g, i), et = W.isValid;
            } catch {
              et = !1;
            }
            if (L && et) return Ue.fromDateTimes(O, W);
            if (L) {
              const vt = ge.fromISO(g, i);
              if (vt.isValid) return Ue.after(O, vt);
            } else if (et) {
              const vt = ge.fromISO(a, i);
              if (vt.isValid) return Ue.before(W, vt);
            }
          }
          return Ue.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`);
        }
        static isInterval(t) {
          return t && t.isLuxonInterval || !1;
        }
        get start() {
          return this.isValid ? this.s : null;
        }
        get end() {
          return this.isValid ? this.e : null;
        }
        get isValid() {
          return this.invalidReason === null;
        }
        get invalidReason() {
          return this.invalid ? this.invalid.reason : null;
        }
        get invalidExplanation() {
          return this.invalid ? this.invalid.explanation : null;
        }
        length(t = "milliseconds") {
          return this.isValid ? this.toDuration(t).get(t) : NaN;
        }
        count(t = "milliseconds", i) {
          if (!this.isValid) return NaN;
          const a = this.start.startOf(t, i);
          let g;
          return g = i != null && i.useLocaleWeeks ? this.end.reconfigure({ locale: a.locale }) : this.end, g = g.startOf(t, i), Math.floor(g.diff(a, t).get(t)) + (g.valueOf() !== this.end.valueOf());
        }
        hasSame(t) {
          return !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, t));
        }
        isEmpty() {
          return this.s.valueOf() === this.e.valueOf();
        }
        isAfter(t) {
          return !!this.isValid && this.s > t;
        }
        isBefore(t) {
          return !!this.isValid && this.e <= t;
        }
        contains(t) {
          return !!this.isValid && this.s <= t && this.e > t;
        }
        set({ start: t, end: i } = {}) {
          return this.isValid ? Ue.fromDateTimes(t || this.s, i || this.e) : this;
        }
        splitAt(...t) {
          if (!this.isValid) return [];
          const i = t.map(Zn).filter((L) => this.contains(L)).sort((L, W) => L.toMillis() - W.toMillis()), a = [];
          let { s: g } = this, O = 0;
          for (; g < this.e; ) {
            const L = i[O] || this.e, W = +L > +this.e ? this.e : L;
            a.push(Ue.fromDateTimes(g, W)), g = W, O += 1;
          }
          return a;
        }
        splitBy(t) {
          const i = ge.fromDurationLike(t);
          if (!this.isValid || !i.isValid || i.as("milliseconds") === 0) return [];
          let a, { s: g } = this, O = 1;
          const L = [];
          for (; g < this.e; ) {
            const W = this.start.plus(i.mapUnits((et) => et * O));
            a = +W > +this.e ? this.e : W, L.push(Ue.fromDateTimes(g, a)), g = a, O += 1;
          }
          return L;
        }
        divideEqually(t) {
          return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
        }
        overlaps(t) {
          return this.e > t.s && this.s < t.e;
        }
        abutsStart(t) {
          return !!this.isValid && +this.e == +t.s;
        }
        abutsEnd(t) {
          return !!this.isValid && +t.e == +this.s;
        }
        engulfs(t) {
          return !!this.isValid && this.s <= t.s && this.e >= t.e;
        }
        equals(t) {
          return !(!this.isValid || !t.isValid) && this.s.equals(t.s) && this.e.equals(t.e);
        }
        intersection(t) {
          if (!this.isValid) return this;
          const i = this.s > t.s ? this.s : t.s, a = this.e < t.e ? this.e : t.e;
          return i >= a ? null : Ue.fromDateTimes(i, a);
        }
        union(t) {
          if (!this.isValid) return this;
          const i = this.s < t.s ? this.s : t.s, a = this.e > t.e ? this.e : t.e;
          return Ue.fromDateTimes(i, a);
        }
        static merge(t) {
          const [i, a] = t.sort((g, O) => g.s - O.s).reduce(([g, O], L) => O ? O.overlaps(L) || O.abutsStart(L) ? [g, O.union(L)] : [g.concat([O]), L] : [g, L], [[], null]);
          return a && i.push(a), i;
        }
        static xor(t) {
          let i = null, a = 0;
          const g = [], O = t.map((W) => [{ time: W.s, type: "s" }, { time: W.e, type: "e" }]), L = Array.prototype.concat(...O).sort((W, et) => W.time - et.time);
          for (const W of L) a += W.type === "s" ? 1 : -1, a === 1 ? i = W.time : (i && +i != +W.time && g.push(Ue.fromDateTimes(i, W.time)), i = null);
          return Ue.merge(g);
        }
        difference(...t) {
          return Ue.xor([this].concat(t)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
        }
        toString() {
          return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : $n;
        }
        [Symbol.for("nodejs.util.inspect.custom")]() {
          return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
        }
        toLocaleString(t = Wt, i = {}) {
          return this.isValid ? v.create(this.s.loc.clone(i), t).formatInterval(this) : $n;
        }
        toISO(t) {
          return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : $n;
        }
        toISODate() {
          return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : $n;
        }
        toISOTime(t) {
          return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : $n;
        }
        toFormat(t, { separator: i = " – " } = {}) {
          return this.isValid ? `${this.s.toFormat(t)}${i}${this.e.toFormat(t)}` : $n;
        }
        toDuration(t, i) {
          return this.isValid ? this.e.diff(this.s, t, i) : ge.invalid(this.invalidReason);
        }
        mapEndpoints(t) {
          return Ue.fromDateTimes(t(this.s), t(this.e));
        }
      }
      class Wn {
        static hasDST(t = it.defaultZone) {
          const i = le.now().setZone(t).set({ month: 12 });
          return !t.isUniversal && i.offset !== i.set({ month: 6 }).offset;
        }
        static isValidIANAZone(t) {
          return be.isValidZone(t);
        }
        static normalizeZone(t) {
          return Jt(t, it.defaultZone);
        }
        static getStartOfWeek({ locale: t = null, locObj: i = null } = {}) {
          return (i || X.create(t)).getStartOfWeek();
        }
        static getMinimumDaysInFirstWeek({ locale: t = null, locObj: i = null } = {}) {
          return (i || X.create(t)).getMinDaysInFirstWeek();
        }
        static getWeekendWeekdays({ locale: t = null, locObj: i = null } = {}) {
          return (i || X.create(t)).getWeekendDays().slice();
        }
        static months(t = "long", { locale: i = null, numberingSystem: a = null, locObj: g = null, outputCalendar: O = "gregory" } = {}) {
          return (g || X.create(i, a, O)).months(t);
        }
        static monthsFormat(t = "long", { locale: i = null, numberingSystem: a = null, locObj: g = null, outputCalendar: O = "gregory" } = {}) {
          return (g || X.create(i, a, O)).months(t, !0);
        }
        static weekdays(t = "long", { locale: i = null, numberingSystem: a = null, locObj: g = null } = {}) {
          return (g || X.create(i, a, null)).weekdays(t);
        }
        static weekdaysFormat(t = "long", { locale: i = null, numberingSystem: a = null, locObj: g = null } = {}) {
          return (g || X.create(i, a, null)).weekdays(t, !0);
        }
        static meridiems({ locale: t = null } = {}) {
          return X.create(t).meridiems();
        }
        static eras(t = "short", { locale: i = null } = {}) {
          return X.create(i, null, "gregory").eras(t);
        }
        static features() {
          return { relative: On(), localeWeek: vn() };
        }
      }
      function yi(l, t) {
        const i = (g) => g.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), a = i(t) - i(l);
        return Math.floor(ge.fromMillis(a).as("days"));
      }
      const li = { arab: "[٠-٩]", arabext: "[۰-۹]", bali: "[᭐-᭙]", beng: "[০-৯]", deva: "[०-९]", fullwide: "[０-９]", gujr: "[૦-૯]", hanidec: "[〇|一|二|三|四|五|六|七|八|九]", khmr: "[០-៩]", knda: "[೦-೯]", laoo: "[໐-໙]", limb: "[᥆-᥏]", mlym: "[൦-൯]", mong: "[᠐-᠙]", mymr: "[၀-၉]", orya: "[୦-୯]", tamldec: "[௦-௯]", telu: "[౦-౯]", thai: "[๐-๙]", tibt: "[༠-༩]", latn: "\\d" }, bi = { arab: [1632, 1641], arabext: [1776, 1785], bali: [6992, 7001], beng: [2534, 2543], deva: [2406, 2415], fullwide: [65296, 65303], gujr: [2790, 2799], khmr: [6112, 6121], knda: [3302, 3311], laoo: [3792, 3801], limb: [6470, 6479], mlym: [3430, 3439], mong: [6160, 6169], mymr: [4160, 4169], orya: [2918, 2927], tamldec: [3046, 3055], telu: [3174, 3183], thai: [3664, 3673], tibt: [3872, 3881] }, Hi = li.hanidec.replace(/[\[|\]]/g, "").split("");
      function mn({ numberingSystem: l }, t = "") {
        return new RegExp(`${li[l || "latn"]}${t}`);
      }
      function Sn(l, t = (i) => i) {
        return { regex: l, deser: ([i]) => t(function(a) {
          let g = parseInt(a, 10);
          if (isNaN(g)) {
            g = "";
            for (let O = 0; O < a.length; O++) {
              const L = a.charCodeAt(O);
              if (a[O].search(li.hanidec) !== -1) g += Hi.indexOf(a[O]);
              else for (const W in bi) {
                const [et, vt] = bi[W];
                L >= et && L <= vt && (g += L - et);
              }
            }
            return parseInt(g, 10);
          }
          return g;
        }(i)) };
      }
      const Ei = "[  ]", wi = new RegExp(Ei, "g");
      function Wi(l) {
        return l.replace(/\./g, "\\.?").replace(wi, Ei);
      }
      function Si(l) {
        return l.replace(/\./g, "").replace(wi, " ").toLowerCase();
      }
      function pn(l, t) {
        return l === null ? null : { regex: RegExp(l.map(Wi).join("|")), deser: ([i]) => l.findIndex((a) => Si(i) === Si(a)) + t };
      }
      function ki(l, t) {
        return { regex: l, deser: ([, i, a]) => St(i, a), groups: t };
      }
      function ei(l) {
        return { regex: l, deser: ([t]) => t };
      }
      const Ji = { year: { "2-digit": "yy", numeric: "yyyyy" }, month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" }, day: { numeric: "d", "2-digit": "dd" }, weekday: { short: "EEE", long: "EEEE" }, dayperiod: "a", dayPeriod: "a", hour12: { numeric: "h", "2-digit": "hh" }, hour24: { numeric: "H", "2-digit": "HH" }, minute: { numeric: "m", "2-digit": "mm" }, second: { numeric: "s", "2-digit": "ss" }, timeZoneName: { long: "ZZZZZ", short: "ZZZ" } };
      let ci = null;
      function Ii(l, t) {
        return Array.prototype.concat(...l.map((i) => function(a, g) {
          if (a.literal) return a;
          const O = Ai(v.macroTokenToFormatOpts(a.val), g);
          return O == null || O.includes(void 0) ? a : O;
        }(i, t)));
      }
      function Ci(l, t, i) {
        const a = Ii(v.parseFormat(i), l), g = a.map((L) => function(W, et) {
          const vt = mn(et), Gt = mn(et, "{2}"), Mt = mn(et, "{3}"), ee = mn(et, "{4}"), ie = mn(et, "{6}"), zt = mn(et, "{1,2}"), Ae = mn(et, "{1,3}"), Se = mn(et, "{1,6}"), Ie = mn(et, "{1,9}"), Pe = mn(et, "{2,4}"), Ze = mn(et, "{4,6}"), De = (tn) => {
            return { regex: RegExp((Ln = tn.val, Ln.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"))), deser: ([sn]) => sn, literal: !0 };
            var Ln;
          }, Me = ((tn) => {
            if (W.literal) return De(tn);
            switch (tn.val) {
              case "G":
                return pn(et.eras("short"), 0);
              case "GG":
                return pn(et.eras("long"), 0);
              case "y":
                return Sn(Se);
              case "yy":
              case "kk":
                return Sn(Pe, I);
              case "yyyy":
              case "kkkk":
                return Sn(ee);
              case "yyyyy":
                return Sn(Ze);
              case "yyyyyy":
                return Sn(ie);
              case "M":
              case "L":
              case "d":
              case "H":
              case "h":
              case "m":
              case "q":
              case "s":
              case "W":
                return Sn(zt);
              case "MM":
              case "LL":
              case "dd":
              case "HH":
              case "hh":
              case "mm":
              case "qq":
              case "ss":
              case "WW":
                return Sn(Gt);
              case "MMM":
                return pn(et.months("short", !0), 1);
              case "MMMM":
                return pn(et.months("long", !0), 1);
              case "LLL":
                return pn(et.months("short", !1), 1);
              case "LLLL":
                return pn(et.months("long", !1), 1);
              case "o":
              case "S":
                return Sn(Ae);
              case "ooo":
              case "SSS":
                return Sn(Mt);
              case "u":
                return ei(Ie);
              case "uu":
                return ei(zt);
              case "uuu":
              case "E":
              case "c":
                return Sn(vt);
              case "a":
                return pn(et.meridiems(), 0);
              case "EEE":
                return pn(et.weekdays("short", !1), 1);
              case "EEEE":
                return pn(et.weekdays("long", !1), 1);
              case "ccc":
                return pn(et.weekdays("short", !0), 1);
              case "cccc":
                return pn(et.weekdays("long", !0), 1);
              case "Z":
              case "ZZ":
                return ki(new RegExp(`([+-]${zt.source})(?::(${Gt.source}))?`), 2);
              case "ZZZ":
                return ki(new RegExp(`([+-]${zt.source})(${Gt.source})?`), 2);
              case "z":
                return ei(/[a-z_+-/]{1,256}?/i);
              case " ":
                return ei(/[^\S\n\r]/);
              default:
                return De(tn);
            }
          })(W) || { invalidReason: "missing Intl.DateTimeFormat.formatToParts support" };
          return Me.token = W, Me;
        }(L, l)), O = g.find((L) => L.invalidReason);
        if (O) return { input: t, tokens: a, invalidReason: O.invalidReason };
        {
          const [L, W] = function(zt) {
            return [`^${zt.map((Ae) => Ae.regex).reduce((Ae, Se) => `${Ae}(${Se.source})`, "")}$`, zt];
          }(g), et = RegExp(L, "i"), [vt, Gt] = function(zt, Ae, Se) {
            const Ie = zt.match(Ae);
            if (Ie) {
              const Pe = {};
              let Ze = 1;
              for (const De in Se) if (hn(Se, De)) {
                const Me = Se[De], tn = Me.groups ? Me.groups + 1 : 1;
                !Me.literal && Me.token && (Pe[Me.token.val[0]] = Me.deser(Ie.slice(Ze, Ze + tn))), Ze += tn;
              }
              return [Ie, Pe];
            }
            return [Ie, {}];
          }(t, et, W), [Mt, ee, ie] = Gt ? function(zt) {
            let Ae, Se = null;
            return Yt(zt.z) || (Se = be.create(zt.z)), Yt(zt.Z) || (Se || (Se = new ct(zt.Z)), Ae = zt.Z), Yt(zt.q) || (zt.M = 3 * (zt.q - 1) + 1), Yt(zt.h) || (zt.h < 12 && zt.a === 1 ? zt.h += 12 : zt.h === 12 && zt.a === 0 && (zt.h = 0)), zt.G === 0 && zt.y && (zt.y = -zt.y), Yt(zt.u) || (zt.S = Tn(zt.u)), [Object.keys(zt).reduce((Ie, Pe) => {
              const Ze = ((De) => {
                switch (De) {
                  case "S":
                    return "millisecond";
                  case "s":
                    return "second";
                  case "m":
                    return "minute";
                  case "h":
                  case "H":
                    return "hour";
                  case "d":
                    return "day";
                  case "o":
                    return "ordinal";
                  case "L":
                  case "M":
                    return "month";
                  case "y":
                    return "year";
                  case "E":
                  case "c":
                    return "weekday";
                  case "W":
                    return "weekNumber";
                  case "k":
                    return "weekYear";
                  case "q":
                    return "quarter";
                  default:
                    return null;
                }
              })(Pe);
              return Ze && (Ie[Ze] = zt[Pe]), Ie;
            }, {}), Se, Ae];
          }(Gt) : [null, null, void 0];
          if (hn(Gt, "a") && hn(Gt, "H")) throw new Kt("Can't include meridiem when specifying 24-hour format");
          return { input: t, tokens: a, regex: et, rawMatches: vt, matches: Gt, result: Mt, zone: ee, specificOffset: ie };
        }
      }
      function Ai(l, t) {
        if (!l) return null;
        const i = v.create(t, l).dtFormatter((ci || (ci = le.fromMillis(1555555555555)), ci)), a = i.formatToParts(), g = i.resolvedOptions();
        return a.map((O) => function(L, W, et) {
          const { type: vt, value: Gt } = L;
          if (vt === "literal") {
            const zt = /^\s+$/.test(Gt);
            return { literal: !zt, val: zt ? " " : Gt };
          }
          const Mt = W[vt];
          let ee = vt;
          vt === "hour" && (ee = W.hour12 != null ? W.hour12 ? "hour12" : "hour24" : W.hourCycle != null ? W.hourCycle === "h11" || W.hourCycle === "h12" ? "hour12" : "hour24" : et.hour12 ? "hour12" : "hour24");
          let ie = Ji[ee];
          if (typeof ie == "object" && (ie = ie[Mt]), ie) return { literal: !1, val: ie };
        }(O, l, g));
      }
      const ui = "Invalid DateTime", Oi = 864e13;
      function ni(l) {
        return new st("unsupported zone", `the zone "${l.name}" is not supported`);
      }
      function di(l) {
        return l.weekData === null && (l.weekData = rt(l.c)), l.weekData;
      }
      function hi(l) {
        return l.localWeekData === null && (l.localWeekData = rt(l.c, l.loc.getMinDaysInFirstWeek(), l.loc.getStartOfWeek())), l.localWeekData;
      }
      function Vn(l, t) {
        const i = { ts: l.ts, zone: l.zone, c: l.c, o: l.o, loc: l.loc, invalid: l.invalid };
        return new le({ ...i, ...t, old: i });
      }
      function Ti(l, t, i) {
        let a = l - 60 * t * 1e3;
        const g = i.offset(a);
        if (t === g) return [a, t];
        a -= 60 * (g - t) * 1e3;
        const O = i.offset(a);
        return g === O ? [a, g] : [l - 60 * Math.min(g, O) * 1e3, Math.max(g, O)];
      }
      function ii(l, t) {
        const i = new Date(l += 60 * t * 1e3);
        return { year: i.getUTCFullYear(), month: i.getUTCMonth() + 1, day: i.getUTCDate(), hour: i.getUTCHours(), minute: i.getUTCMinutes(), second: i.getUTCSeconds(), millisecond: i.getUTCMilliseconds() };
      }
      function si(l, t, i) {
        return Ti(s(l), t, i);
      }
      function xi(l, t) {
        const i = l.o, a = l.c.year + Math.trunc(t.years), g = l.c.month + Math.trunc(t.months) + 3 * Math.trunc(t.quarters), O = { ...l.c, year: a, month: g, day: Math.min(l.c.day, e(a, g)) + Math.trunc(t.days) + 7 * Math.trunc(t.weeks) }, L = ge.fromObject({ years: t.years - Math.trunc(t.years), quarters: t.quarters - Math.trunc(t.quarters), months: t.months - Math.trunc(t.months), weeks: t.weeks - Math.trunc(t.weeks), days: t.days - Math.trunc(t.days), hours: t.hours, minutes: t.minutes, seconds: t.seconds, milliseconds: t.milliseconds }).as("milliseconds"), W = s(O);
        let [et, vt] = Ti(W, i, l.zone);
        return L !== 0 && (et += L, vt = l.zone.offset(et)), { ts: et, o: vt };
      }
      function Jn(l, t, i, a, g, O) {
        const { setZone: L, zone: W } = i;
        if (l && Object.keys(l).length !== 0 || t) {
          const et = t || W, vt = le.fromObject(l, { ...i, zone: et, specificOffset: O });
          return L ? vt : vt.setZone(W);
        }
        return le.invalid(new st("unparsable", `the input "${g}" can't be parsed as ${a}`));
      }
      function ri(l, t, i = !0) {
        return l.isValid ? v.create(X.create("en-US"), { allowZ: i, forceSimple: !0 }).formatDateTimeFromString(l, t) : null;
      }
      function fi(l, t) {
        const i = l.c.year > 9999 || l.c.year < 0;
        let a = "";
        return i && l.c.year >= 0 && (a += "+"), a += Re(l.c.year, i ? 6 : 4), t ? (a += "-", a += Re(l.c.month), a += "-", a += Re(l.c.day)) : (a += Re(l.c.month), a += Re(l.c.day)), a;
      }
      function Ri(l, t, i, a, g, O) {
        let L = Re(l.c.hour);
        return t ? (L += ":", L += Re(l.c.minute), l.c.millisecond === 0 && l.c.second === 0 && i || (L += ":")) : L += Re(l.c.minute), l.c.millisecond === 0 && l.c.second === 0 && i || (L += Re(l.c.second), l.c.millisecond === 0 && a || (L += ".", L += Re(l.c.millisecond, 3))), g && (l.isOffsetFixed && l.offset === 0 && !O ? L += "Z" : l.o < 0 ? (L += "-", L += Re(Math.trunc(-l.o / 60)), L += ":", L += Re(Math.trunc(-l.o % 60))) : (L += "+", L += Re(Math.trunc(l.o / 60)), L += ":", L += Re(Math.trunc(l.o % 60)))), O && (L += "[" + l.zone.ianaName + "]"), L;
      }
      const Ni = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, Zi = { weekNumber: 1, weekday: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, Gi = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }, Li = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Ki = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], Yi = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
      function Di(l) {
        switch (l.toLowerCase()) {
          case "localweekday":
          case "localweekdays":
            return "localWeekday";
          case "localweeknumber":
          case "localweeknumbers":
            return "localWeekNumber";
          case "localweekyear":
          case "localweekyears":
            return "localWeekYear";
          default:
            return function(t) {
              const i = { year: "year", years: "year", month: "month", months: "month", day: "day", days: "day", hour: "hour", hours: "hour", minute: "minute", minutes: "minute", quarter: "quarter", quarters: "quarter", second: "second", seconds: "second", millisecond: "millisecond", milliseconds: "millisecond", weekday: "weekday", weekdays: "weekday", weeknumber: "weekNumber", weeksnumber: "weekNumber", weeknumbers: "weekNumber", weekyear: "weekYear", weekyears: "weekYear", ordinal: "ordinal" }[t.toLowerCase()];
              if (!i) throw new Ht(t);
              return i;
            }(l);
        }
      }
      function Ui(l, t) {
        const i = Jt(t.zone, it.defaultZone), a = X.fromObject(t), g = it.now();
        let O, L;
        if (Yt(l.year)) O = g;
        else {
          for (const vt of Li) Yt(l[vt]) && (l[vt] = Ni[vt]);
          const W = he(l) || Xe(l);
          if (W) return le.invalid(W);
          const et = i.offset(g);
          [O, L] = si(l, et, i);
        }
        return new le({ ts: O, zone: i, loc: a, o: L });
      }
      function Pi(l, t, i) {
        const a = !!Yt(i.round) || i.round, g = (L, W) => (L = fn(L, a || i.calendary ? 0 : 2, !0), t.loc.clone(i).relFormatter(i).format(L, W)), O = (L) => i.calendary ? t.hasSame(l, L) ? 0 : t.startOf(L).diff(l.startOf(L), L).get(L) : t.diff(l, L).get(L);
        if (i.unit) return g(O(i.unit), i.unit);
        for (const L of i.units) {
          const W = O(L);
          if (Math.abs(W) >= 1) return g(W, L);
        }
        return g(l > t ? -0 : 0, i.units[i.units.length - 1]);
      }
      function Vi(l) {
        let t, i = {};
        return l.length > 0 && typeof l[l.length - 1] == "object" ? (i = l[l.length - 1], t = Array.from(l).slice(0, l.length - 1)) : t = Array.from(l), [i, t];
      }
      class le {
        constructor(t) {
          const i = t.zone || it.defaultZone;
          let a = t.invalid || (Number.isNaN(t.ts) ? new st("invalid input") : null) || (i.isValid ? null : ni(i));
          this.ts = Yt(t.ts) ? it.now() : t.ts;
          let g = null, O = null;
          if (!a) if (t.old && t.old.ts === this.ts && t.old.zone.equals(i)) [g, O] = [t.old.c, t.old.o];
          else {
            const L = i.offset(this.ts);
            g = ii(this.ts, L), a = Number.isNaN(g.year) ? new st("invalid input") : null, g = a ? null : g, O = a ? null : L;
          }
          this._zone = i, this.loc = t.loc || X.create(), this.invalid = a, this.weekData = null, this.localWeekData = null, this.c = g, this.o = O, this.isLuxonDateTime = !0;
        }
        static now() {
          return new le({});
        }
        static local() {
          const [t, i] = Vi(arguments), [a, g, O, L, W, et, vt] = i;
          return Ui({ year: a, month: g, day: O, hour: L, minute: W, second: et, millisecond: vt }, t);
        }
        static utc() {
          const [t, i] = Vi(arguments), [a, g, O, L, W, et, vt] = i;
          return t.zone = ct.utcInstance, Ui({ year: a, month: g, day: O, hour: L, minute: W, second: et, millisecond: vt }, t);
        }
        static fromJSDate(t, i = {}) {
          const a = (g = t, Object.prototype.toString.call(g) === "[object Date]" ? t.valueOf() : NaN);
          var g;
          if (Number.isNaN(a)) return le.invalid("invalid input");
          const O = Jt(i.zone, it.defaultZone);
          return O.isValid ? new le({ ts: a, zone: O, loc: X.fromObject(i) }) : le.invalid(ni(O));
        }
        static fromMillis(t, i = {}) {
          if ($e(t)) return t < -Oi || t > Oi ? le.invalid("Timestamp out of range") : new le({ ts: t, zone: Jt(i.zone, it.defaultZone), loc: X.fromObject(i) });
          throw new Ot(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`);
        }
        static fromSeconds(t, i = {}) {
          if ($e(t)) return new le({ ts: 1e3 * t, zone: Jt(i.zone, it.defaultZone), loc: X.fromObject(i) });
          throw new Ot("fromSeconds requires a numerical input");
        }
        static fromObject(t, i = {}) {
          t = t || {};
          const a = Jt(i.zone, it.defaultZone);
          if (!a.isValid) return le.invalid(ni(a));
          const g = X.fromObject(i), O = ut(t, Di), { minDaysInFirstWeek: L, startOfWeek: W } = me(O, g), et = it.now(), vt = Yt(i.specificOffset) ? a.offset(et) : i.specificOffset, Gt = !Yt(O.ordinal), Mt = !Yt(O.year), ee = !Yt(O.month) || !Yt(O.day), ie = Mt || ee, zt = O.weekYear || O.weekNumber;
          if ((ie || Gt) && zt) throw new Kt("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
          if (ee && Gt) throw new Kt("Can't mix ordinal dates with month/day");
          const Ae = zt || O.weekday && !ie;
          let Se, Ie, Pe = ii(et, vt);
          Ae ? (Se = Ki, Ie = Zi, Pe = rt(Pe, L, W)) : Gt ? (Se = Yi, Ie = Gi, Pe = Bt(Pe)) : (Se = Li, Ie = Ni);
          let Ze = !1;
          for (const je of Se) Yt(O[je]) ? O[je] = Ze ? Ie[je] : Pe[je] : Ze = !0;
          const De = Ae ? function(je, Cn = 4, Ge = 1) {
            const rn = on(je.weekYear), oi = Ke(je.weekNumber, 1, c(je.weekYear, Cn, Ge)), Xi = Ke(je.weekday, 1, 7);
            return rn ? oi ? !Xi && T("weekday", je.weekday) : T("week", je.weekNumber) : T("weekYear", je.weekYear);
          }(O, L, W) : Gt ? function(je) {
            const Cn = on(je.year), Ge = Ke(je.ordinal, 1, p(je.year));
            return Cn ? !Ge && T("ordinal", je.ordinal) : T("year", je.year);
          }(O) : he(O), Me = De || Xe(O);
          if (Me) return le.invalid(Me);
          const tn = Ae ? Nt(O, L, W) : Gt ? Ee(O) : O, [Ln, sn] = si(tn, vt, a), Mn = new le({ ts: Ln, zone: a, o: sn, loc: g });
          return O.weekday && ie && t.weekday !== Mn.weekday ? le.invalid("mismatched weekday", `you can't specify both a weekday of ${O.weekday} and a date of ${Mn.toISO()}`) : Mn;
        }
        static fromISO(t, i = {}) {
          const [a, g] = function(O) {
            return tt(O, [wn, dn], [ti, Rn], [ai, Je], [gn, Hn]);
          }(t);
          return Jn(a, g, i, "ISO 8601", t);
        }
        static fromRFC2822(t, i = {}) {
          const [a, g] = function(O) {
            return tt(function(L) {
              return L.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
            }(O), [Yn, Fn]);
          }(t);
          return Jn(a, g, i, "RFC 2822", t);
        }
        static fromHTTP(t, i = {}) {
          const [a, g] = function(O) {
            return tt(O, [Un, nn], [In, nn], [Xn, Qn]);
          }(t);
          return Jn(a, g, i, "HTTP", i);
        }
        static fromFormat(t, i, a = {}) {
          if (Yt(t) || Yt(i)) throw new Ot("fromFormat requires an input string and a format");
          const { locale: g = null, numberingSystem: O = null } = a, L = X.fromOpts({ locale: g, numberingSystem: O, defaultToEN: !0 }), [W, et, vt, Gt] = function(Mt, ee, ie) {
            const { result: zt, zone: Ae, specificOffset: Se, invalidReason: Ie } = Ci(Mt, ee, ie);
            return [zt, Ae, Se, Ie];
          }(L, t, i);
          return Gt ? le.invalid(Gt) : Jn(W, et, a, `format ${i}`, t, vt);
        }
        static fromString(t, i, a = {}) {
          return le.fromFormat(t, i, a);
        }
        static fromSQL(t, i = {}) {
          const [a, g] = function(O) {
            return tt(O, [ji, dn], [qi, Fi]);
          }(t);
          return Jn(a, g, i, "SQL", t);
        }
        static invalid(t, i = null) {
          if (!t) throw new Ot("need to specify a reason the DateTime is invalid");
          const a = t instanceof st ? t : new st(t, i);
          if (it.throwOnInvalid) throw new Pt(a);
          return new le({ invalid: a });
        }
        static isDateTime(t) {
          return t && t.isLuxonDateTime || !1;
        }
        static parseFormatForOpts(t, i = {}) {
          const a = Ai(t, X.fromObject(i));
          return a ? a.map((g) => g ? g.val : null).join("") : null;
        }
        static expandFormat(t, i = {}) {
          return Ii(v.parseFormat(t), X.fromObject(i)).map((a) => a.val).join("");
        }
        get(t) {
          return this[t];
        }
        get isValid() {
          return this.invalid === null;
        }
        get invalidReason() {
          return this.invalid ? this.invalid.reason : null;
        }
        get invalidExplanation() {
          return this.invalid ? this.invalid.explanation : null;
        }
        get locale() {
          return this.isValid ? this.loc.locale : null;
        }
        get numberingSystem() {
          return this.isValid ? this.loc.numberingSystem : null;
        }
        get outputCalendar() {
          return this.isValid ? this.loc.outputCalendar : null;
        }
        get zone() {
          return this._zone;
        }
        get zoneName() {
          return this.isValid ? this.zone.name : null;
        }
        get year() {
          return this.isValid ? this.c.year : NaN;
        }
        get quarter() {
          return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
        }
        get month() {
          return this.isValid ? this.c.month : NaN;
        }
        get day() {
          return this.isValid ? this.c.day : NaN;
        }
        get hour() {
          return this.isValid ? this.c.hour : NaN;
        }
        get minute() {
          return this.isValid ? this.c.minute : NaN;
        }
        get second() {
          return this.isValid ? this.c.second : NaN;
        }
        get millisecond() {
          return this.isValid ? this.c.millisecond : NaN;
        }
        get weekYear() {
          return this.isValid ? di(this).weekYear : NaN;
        }
        get weekNumber() {
          return this.isValid ? di(this).weekNumber : NaN;
        }
        get weekday() {
          return this.isValid ? di(this).weekday : NaN;
        }
        get isWeekend() {
          return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
        }
        get localWeekday() {
          return this.isValid ? hi(this).weekday : NaN;
        }
        get localWeekNumber() {
          return this.isValid ? hi(this).weekNumber : NaN;
        }
        get localWeekYear() {
          return this.isValid ? hi(this).weekYear : NaN;
        }
        get ordinal() {
          return this.isValid ? Bt(this.c).ordinal : NaN;
        }
        get monthShort() {
          return this.isValid ? Wn.months("short", { locObj: this.loc })[this.month - 1] : null;
        }
        get monthLong() {
          return this.isValid ? Wn.months("long", { locObj: this.loc })[this.month - 1] : null;
        }
        get weekdayShort() {
          return this.isValid ? Wn.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
        }
        get weekdayLong() {
          return this.isValid ? Wn.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
        }
        get offset() {
          return this.isValid ? +this.o : NaN;
        }
        get offsetNameShort() {
          return this.isValid ? this.zone.offsetName(this.ts, { format: "short", locale: this.locale }) : null;
        }
        get offsetNameLong() {
          return this.isValid ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale }) : null;
        }
        get isOffsetFixed() {
          return this.isValid ? this.zone.isUniversal : null;
        }
        get isInDST() {
          return !this.isOffsetFixed && (this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset);
        }
        getPossibleOffsets() {
          if (!this.isValid || this.isOffsetFixed) return [this];
          const t = 864e5, i = 6e4, a = s(this.c), g = this.zone.offset(a - t), O = this.zone.offset(a + t), L = this.zone.offset(a - g * i), W = this.zone.offset(a - O * i);
          if (L === W) return [this];
          const et = a - L * i, vt = a - W * i, Gt = ii(et, L), Mt = ii(vt, W);
          return Gt.hour === Mt.hour && Gt.minute === Mt.minute && Gt.second === Mt.second && Gt.millisecond === Mt.millisecond ? [Vn(this, { ts: et }), Vn(this, { ts: vt })] : [this];
        }
        get isInLeapYear() {
          return bn(this.year);
        }
        get daysInMonth() {
          return e(this.year, this.month);
        }
        get daysInYear() {
          return this.isValid ? p(this.year) : NaN;
        }
        get weeksInWeekYear() {
          return this.isValid ? c(this.weekYear) : NaN;
        }
        get weeksInLocalWeekYear() {
          return this.isValid ? c(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
        }
        resolvedLocaleOptions(t = {}) {
          const { locale: i, numberingSystem: a, calendar: g } = v.create(this.loc.clone(t), t).resolvedOptions(this);
          return { locale: i, numberingSystem: a, outputCalendar: g };
        }
        toUTC(t = 0, i = {}) {
          return this.setZone(ct.instance(t), i);
        }
        toLocal() {
          return this.setZone(it.defaultZone);
        }
        setZone(t, { keepLocalTime: i = !1, keepCalendarTime: a = !1 } = {}) {
          if ((t = Jt(t, it.defaultZone)).equals(this.zone)) return this;
          if (t.isValid) {
            let g = this.ts;
            if (i || a) {
              const O = t.offset(this.ts), L = this.toObject();
              [g] = si(L, O, t);
            }
            return Vn(this, { ts: g, zone: t });
          }
          return le.invalid(ni(t));
        }
        reconfigure({ locale: t, numberingSystem: i, outputCalendar: a } = {}) {
          return Vn(this, { loc: this.loc.clone({ locale: t, numberingSystem: i, outputCalendar: a }) });
        }
        setLocale(t) {
          return this.reconfigure({ locale: t });
        }
        set(t) {
          if (!this.isValid) return this;
          const i = ut(t, Di), { minDaysInFirstWeek: a, startOfWeek: g } = me(i, this.loc), O = !Yt(i.weekYear) || !Yt(i.weekNumber) || !Yt(i.weekday), L = !Yt(i.ordinal), W = !Yt(i.year), et = !Yt(i.month) || !Yt(i.day), vt = W || et, Gt = i.weekYear || i.weekNumber;
          if ((vt || L) && Gt) throw new Kt("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
          if (et && L) throw new Kt("Can't mix ordinal dates with month/day");
          let Mt;
          O ? Mt = Nt({ ...rt(this.c, a, g), ...i }, a, g) : Yt(i.ordinal) ? (Mt = { ...this.toObject(), ...i }, Yt(i.day) && (Mt.day = Math.min(e(Mt.year, Mt.month), Mt.day))) : Mt = Ee({ ...Bt(this.c), ...i });
          const [ee, ie] = si(Mt, this.o, this.zone);
          return Vn(this, { ts: ee, o: ie });
        }
        plus(t) {
          return this.isValid ? Vn(this, xi(this, ge.fromDurationLike(t))) : this;
        }
        minus(t) {
          return this.isValid ? Vn(this, xi(this, ge.fromDurationLike(t).negate())) : this;
        }
        startOf(t, { useLocaleWeeks: i = !1 } = {}) {
          if (!this.isValid) return this;
          const a = {}, g = ge.normalizeUnit(t);
          switch (g) {
            case "years":
              a.month = 1;
            case "quarters":
            case "months":
              a.day = 1;
            case "weeks":
            case "days":
              a.hour = 0;
            case "hours":
              a.minute = 0;
            case "minutes":
              a.second = 0;
            case "seconds":
              a.millisecond = 0;
          }
          if (g === "weeks") if (i) {
            const O = this.loc.getStartOfWeek(), { weekday: L } = this;
            L < O && (a.weekNumber = this.weekNumber - 1), a.weekday = O;
          } else a.weekday = 1;
          if (g === "quarters") {
            const O = Math.ceil(this.month / 3);
            a.month = 3 * (O - 1) + 1;
          }
          return this.set(a);
        }
        endOf(t, i) {
          return this.isValid ? this.plus({ [t]: 1 }).startOf(t, i).minus(1) : this;
        }
        toFormat(t, i = {}) {
          return this.isValid ? v.create(this.loc.redefaultToEN(i)).formatDateTimeFromString(this, t) : ui;
        }
        toLocaleString(t = Wt, i = {}) {
          return this.isValid ? v.create(this.loc.clone(i), t).formatDateTime(this) : ui;
        }
        toLocaleParts(t = {}) {
          return this.isValid ? v.create(this.loc.clone(t), t).formatDateTimeParts(this) : [];
        }
        toISO({ format: t = "extended", suppressSeconds: i = !1, suppressMilliseconds: a = !1, includeOffset: g = !0, extendedZone: O = !1 } = {}) {
          if (!this.isValid) return null;
          const L = t === "extended";
          let W = fi(this, L);
          return W += "T", W += Ri(this, L, i, a, g, O), W;
        }
        toISODate({ format: t = "extended" } = {}) {
          return this.isValid ? fi(this, t === "extended") : null;
        }
        toISOWeekDate() {
          return ri(this, "kkkk-'W'WW-c");
        }
        toISOTime({ suppressMilliseconds: t = !1, suppressSeconds: i = !1, includeOffset: a = !0, includePrefix: g = !1, extendedZone: O = !1, format: L = "extended" } = {}) {
          return this.isValid ? (g ? "T" : "") + Ri(this, L === "extended", i, t, a, O) : null;
        }
        toRFC2822() {
          return ri(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
        }
        toHTTP() {
          return ri(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
        }
        toSQLDate() {
          return this.isValid ? fi(this, !0) : null;
        }
        toSQLTime({ includeOffset: t = !0, includeZone: i = !1, includeOffsetSpace: a = !0 } = {}) {
          let g = "HH:mm:ss.SSS";
          return (i || t) && (a && (g += " "), i ? g += "z" : t && (g += "ZZ")), ri(this, g, !0);
        }
        toSQL(t = {}) {
          return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
        }
        toString() {
          return this.isValid ? this.toISO() : ui;
        }
        [Symbol.for("nodejs.util.inspect.custom")]() {
          return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
        }
        valueOf() {
          return this.toMillis();
        }
        toMillis() {
          return this.isValid ? this.ts : NaN;
        }
        toSeconds() {
          return this.isValid ? this.ts / 1e3 : NaN;
        }
        toUnixInteger() {
          return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
        }
        toJSON() {
          return this.toISO();
        }
        toBSON() {
          return this.toJSDate();
        }
        toObject(t = {}) {
          if (!this.isValid) return {};
          const i = { ...this.c };
          return t.includeConfig && (i.outputCalendar = this.outputCalendar, i.numberingSystem = this.loc.numberingSystem, i.locale = this.loc.locale), i;
        }
        toJSDate() {
          return new Date(this.isValid ? this.ts : NaN);
        }
        diff(t, i = "milliseconds", a = {}) {
          if (!this.isValid || !t.isValid) return ge.invalid("created by diffing an invalid DateTime");
          const g = { locale: this.locale, numberingSystem: this.numberingSystem, ...a }, O = (et = i, Array.isArray(et) ? et : [et]).map(ge.normalizeUnit), L = t.valueOf() > this.valueOf(), W = function(vt, Gt, Mt, ee) {
            let [ie, zt, Ae, Se] = function(De, Me, tn) {
              const Ln = [["years", (Ge, rn) => rn.year - Ge.year], ["quarters", (Ge, rn) => rn.quarter - Ge.quarter + 4 * (rn.year - Ge.year)], ["months", (Ge, rn) => rn.month - Ge.month + 12 * (rn.year - Ge.year)], ["weeks", (Ge, rn) => {
                const oi = yi(Ge, rn);
                return (oi - oi % 7) / 7;
              }], ["days", yi]], sn = {}, Mn = De;
              let je, Cn;
              for (const [Ge, rn] of Ln) tn.indexOf(Ge) >= 0 && (je = Ge, sn[Ge] = rn(De, Me), Cn = Mn.plus(sn), Cn > Me ? (sn[Ge]--, (De = Mn.plus(sn)) > Me && (Cn = De, sn[Ge]--, De = Mn.plus(sn))) : De = Cn);
              return [De, sn, Cn, je];
            }(vt, Gt, Mt);
            const Ie = Gt - ie, Pe = Mt.filter((De) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(De) >= 0);
            Pe.length === 0 && (Ae < Gt && (Ae = ie.plus({ [Se]: 1 })), Ae !== ie && (zt[Se] = (zt[Se] || 0) + Ie / (Ae - ie)));
            const Ze = ge.fromObject(zt, ee);
            return Pe.length > 0 ? ge.fromMillis(Ie, ee).shiftTo(...Pe).plus(Ze) : Ze;
          }(L ? this : t, L ? t : this, O, g);
          var et;
          return L ? W.negate() : W;
        }
        diffNow(t = "milliseconds", i = {}) {
          return this.diff(le.now(), t, i);
        }
        until(t) {
          return this.isValid ? Ue.fromDateTimes(this, t) : this;
        }
        hasSame(t, i, a) {
          if (!this.isValid) return !1;
          const g = t.valueOf(), O = this.setZone(t.zone, { keepLocalTime: !0 });
          return O.startOf(i, a) <= g && g <= O.endOf(i, a);
        }
        equals(t) {
          return this.isValid && t.isValid && this.valueOf() === t.valueOf() && this.zone.equals(t.zone) && this.loc.equals(t.loc);
        }
        toRelative(t = {}) {
          if (!this.isValid) return null;
          const i = t.base || le.fromObject({}, { zone: this.zone }), a = t.padding ? this < i ? -t.padding : t.padding : 0;
          let g = ["years", "months", "days", "hours", "minutes", "seconds"], O = t.unit;
          return Array.isArray(t.unit) && (g = t.unit, O = void 0), Pi(i, this.plus(a), { ...t, numeric: "always", units: g, unit: O });
        }
        toRelativeCalendar(t = {}) {
          return this.isValid ? Pi(t.base || le.fromObject({}, { zone: this.zone }), this, { ...t, numeric: "auto", units: ["years", "months", "days"], calendary: !0 }) : null;
        }
        static min(...t) {
          if (!t.every(le.isDateTime)) throw new Ot("min requires all arguments be DateTimes");
          return yn(t, (i) => i.valueOf(), Math.min);
        }
        static max(...t) {
          if (!t.every(le.isDateTime)) throw new Ot("max requires all arguments be DateTimes");
          return yn(t, (i) => i.valueOf(), Math.max);
        }
        static fromFormatExplain(t, i, a = {}) {
          const { locale: g = null, numberingSystem: O = null } = a;
          return Ci(X.fromOpts({ locale: g, numberingSystem: O, defaultToEN: !0 }), t, i);
        }
        static fromStringExplain(t, i, a = {}) {
          return le.fromFormatExplain(t, i, a);
        }
        static get DATE_SHORT() {
          return Wt;
        }
        static get DATE_MED() {
          return Xt;
        }
        static get DATE_MED_WITH_WEEKDAY() {
          return se;
        }
        static get DATE_FULL() {
          return oe;
        }
        static get DATE_HUGE() {
          return qt;
        }
        static get TIME_SIMPLE() {
          return re;
        }
        static get TIME_WITH_SECONDS() {
          return Tt;
        }
        static get TIME_WITH_SHORT_OFFSET() {
          return At;
        }
        static get TIME_WITH_LONG_OFFSET() {
          return te;
        }
        static get TIME_24_SIMPLE() {
          return ce;
        }
        static get TIME_24_WITH_SECONDS() {
          return Ct;
        }
        static get TIME_24_WITH_SHORT_OFFSET() {
          return mt;
        }
        static get TIME_24_WITH_LONG_OFFSET() {
          return jt;
        }
        static get DATETIME_SHORT() {
          return A;
        }
        static get DATETIME_SHORT_WITH_SECONDS() {
          return R;
        }
        static get DATETIME_MED() {
          return N;
        }
        static get DATETIME_MED_WITH_SECONDS() {
          return C;
        }
        static get DATETIME_MED_WITH_WEEKDAY() {
          return V;
        }
        static get DATETIME_FULL() {
          return m;
        }
        static get DATETIME_FULL_WITH_SECONDS() {
          return D;
        }
        static get DATETIME_HUGE() {
          return dt;
        }
        static get DATETIME_HUGE_WITH_SECONDS() {
          return yt;
        }
      }
      function Zn(l) {
        if (le.isDateTime(l)) return l;
        if (l && l.valueOf && $e(l.valueOf())) return le.fromJSDate(l);
        if (l && typeof l == "object") return le.fromObject(l);
        throw new Ot(`Unknown datetime argument: ${l}, of type ${typeof l}`);
      }
      M.DateTime = le, M.Duration = ge, M.FixedOffsetZone = ct, M.IANAZone = be, M.Info = Wn, M.Interval = Ue, M.InvalidZone = Q, M.Settings = it, M.SystemZone = E, M.VERSION = "3.4.4", M.Zone = at;
    }, 566(d, M, K) {
      var Pt = K(684);
      d.exports = function(pt) {
        if (typeof pt != "function" || !hasOwnProperty.call(pt, "length")) return !1;
        try {
          if (typeof pt.length != "number" || typeof pt.call != "function" || typeof pt.apply != "function") return !1;
        } catch {
          return !1;
        }
        return !Pt(pt);
      };
    }, 23(d, M, K) {
      var Pt = K(265), pt = { object: !0, function: !0, undefined: !0 };
      d.exports = function(_t) {
        return !!Pt(_t) && hasOwnProperty.call(pt, typeof _t);
      };
    }, 131(d, M, K) {
      var Pt = K(566), pt = /^\s*class[\s{/}]/, _t = Function.prototype.toString;
      d.exports = function(Kt) {
        return !!Pt(Kt) && !pt.test(_t.call(Kt));
      };
    }, 684(d, M, K) {
      var Pt = K(23);
      d.exports = function(pt) {
        if (!Pt(pt)) return !1;
        try {
          return !!pt.constructor && pt.constructor.prototype === pt;
        } catch {
          return !1;
        }
      };
    }, 265(d) {
      d.exports = function(M) {
        return M != null;
      };
    }, 960(d, M, K) {
      K.r(M), K.d(M, { v1: () => Wt, v3: () => te, v4: () => ce, v5: () => jt });
      var Pt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), pt = new Uint8Array(16);
      function _t() {
        if (!Pt) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return Pt(pt);
      }
      for (var Kt = [], Ht = 0; Ht < 256; ++Ht) Kt[Ht] = (Ht + 256).toString(16).substr(1);
      const Ot = function(A, R) {
        var N = 0, C = Kt;
        return [C[A[N++]], C[A[N++]], C[A[N++]], C[A[N++]], "-", C[A[N++]], C[A[N++]], "-", C[A[N++]], C[A[N++]], "-", C[A[N++]], C[A[N++]], "-", C[A[N++]], C[A[N++]], C[A[N++]], C[A[N++]], C[A[N++]], C[A[N++]]].join("");
      };
      var Et, Z, kt = 0, Ut = 0;
      const Wt = function(A, R, N) {
        var C = R && N || 0, V = R || [], m = (A = A || {}).node || Et, D = A.clockseq !== void 0 ? A.clockseq : Z;
        if (m == null || D == null) {
          var dt = A.random || (A.rng || _t)();
          m == null && (m = Et = [1 | dt[0], dt[1], dt[2], dt[3], dt[4], dt[5]]), D == null && (D = Z = 16383 & (dt[6] << 8 | dt[7]));
        }
        var yt = A.msecs !== void 0 ? A.msecs : (/* @__PURE__ */ new Date()).getTime(), at = A.nsecs !== void 0 ? A.nsecs : Ut + 1, j = yt - kt + (at - Ut) / 1e4;
        if (j < 0 && A.clockseq === void 0 && (D = D + 1 & 16383), (j < 0 || yt > kt) && A.nsecs === void 0 && (at = 0), at >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        kt = yt, Ut = at, Z = D;
        var E = (1e4 * (268435455 & (yt += 122192928e5)) + at) % 4294967296;
        V[C++] = E >>> 24 & 255, V[C++] = E >>> 16 & 255, V[C++] = E >>> 8 & 255, V[C++] = 255 & E;
        var q = yt / 4294967296 * 1e4 & 268435455;
        V[C++] = q >>> 8 & 255, V[C++] = 255 & q, V[C++] = q >>> 24 & 15 | 16, V[C++] = q >>> 16 & 255, V[C++] = D >>> 8 | 128, V[C++] = 255 & D;
        for (var Y = 0; Y < 6; ++Y) V[C + Y] = m[Y];
        return R || Ot(V);
      };
      function Xt(A, R, N) {
        var C = function(V, m, D, dt) {
          var yt = D && dt || 0;
          if (typeof V == "string" && (V = function(E) {
            E = unescape(encodeURIComponent(E));
            for (var q = new Array(E.length), Y = 0; Y < E.length; Y++) q[Y] = E.charCodeAt(Y);
            return q;
          }(V)), typeof m == "string" && (m = function(E) {
            var q = [];
            return E.replace(/[a-fA-F0-9]{2}/g, function(Y) {
              q.push(parseInt(Y, 16));
            }), q;
          }(m)), !Array.isArray(V)) throw TypeError("value must be an array of bytes");
          if (!Array.isArray(m) || m.length !== 16) throw TypeError("namespace must be uuid string or an Array of 16 byte values");
          var at = N(m.concat(V));
          if (at[6] = 15 & at[6] | R, at[8] = 63 & at[8] | 128, D) for (var j = 0; j < 16; ++j) D[yt + j] = at[j];
          return D || Ot(at);
        };
        try {
          C.name = A;
        } catch {
        }
        return C.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", C.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8", C;
      }
      function se(A, R) {
        var N = (65535 & A) + (65535 & R);
        return (A >> 16) + (R >> 16) + (N >> 16) << 16 | 65535 & N;
      }
      function oe(A, R, N, C, V, m) {
        return se((D = se(se(R, A), se(C, m))) << (dt = V) | D >>> 32 - dt, N);
        var D, dt;
      }
      function qt(A, R, N, C, V, m, D) {
        return oe(R & N | ~R & C, A, R, V, m, D);
      }
      function re(A, R, N, C, V, m, D) {
        return oe(R & C | N & ~C, A, R, V, m, D);
      }
      function Tt(A, R, N, C, V, m, D) {
        return oe(R ^ N ^ C, A, R, V, m, D);
      }
      function At(A, R, N, C, V, m, D) {
        return oe(N ^ (R | ~C), A, R, V, m, D);
      }
      const te = Xt("v3", 48, function(A) {
        if (typeof A == "string") {
          var R = unescape(encodeURIComponent(A));
          A = new Array(R.length);
          for (var N = 0; N < R.length; N++) A[N] = R.charCodeAt(N);
        }
        return function(C) {
          var V, m, D, dt = [], yt = 32 * C.length, at = "0123456789abcdef";
          for (V = 0; V < yt; V += 8) m = C[V >> 5] >>> V % 32 & 255, D = parseInt(at.charAt(m >>> 4 & 15) + at.charAt(15 & m), 16), dt.push(D);
          return dt;
        }(function(C, V) {
          var m, D, dt, yt, at;
          C[V >> 5] |= 128 << V % 32, C[14 + (V + 64 >>> 9 << 4)] = V;
          var j = 1732584193, E = -271733879, q = -1732584194, Y = 271733878;
          for (m = 0; m < C.length; m += 16) D = j, dt = E, yt = q, at = Y, j = qt(j, E, q, Y, C[m], 7, -680876936), Y = qt(Y, j, E, q, C[m + 1], 12, -389564586), q = qt(q, Y, j, E, C[m + 2], 17, 606105819), E = qt(E, q, Y, j, C[m + 3], 22, -1044525330), j = qt(j, E, q, Y, C[m + 4], 7, -176418897), Y = qt(Y, j, E, q, C[m + 5], 12, 1200080426), q = qt(q, Y, j, E, C[m + 6], 17, -1473231341), E = qt(E, q, Y, j, C[m + 7], 22, -45705983), j = qt(j, E, q, Y, C[m + 8], 7, 1770035416), Y = qt(Y, j, E, q, C[m + 9], 12, -1958414417), q = qt(q, Y, j, E, C[m + 10], 17, -42063), E = qt(E, q, Y, j, C[m + 11], 22, -1990404162), j = qt(j, E, q, Y, C[m + 12], 7, 1804603682), Y = qt(Y, j, E, q, C[m + 13], 12, -40341101), q = qt(q, Y, j, E, C[m + 14], 17, -1502002290), j = re(j, E = qt(E, q, Y, j, C[m + 15], 22, 1236535329), q, Y, C[m + 1], 5, -165796510), Y = re(Y, j, E, q, C[m + 6], 9, -1069501632), q = re(q, Y, j, E, C[m + 11], 14, 643717713), E = re(E, q, Y, j, C[m], 20, -373897302), j = re(j, E, q, Y, C[m + 5], 5, -701558691), Y = re(Y, j, E, q, C[m + 10], 9, 38016083), q = re(q, Y, j, E, C[m + 15], 14, -660478335), E = re(E, q, Y, j, C[m + 4], 20, -405537848), j = re(j, E, q, Y, C[m + 9], 5, 568446438), Y = re(Y, j, E, q, C[m + 14], 9, -1019803690), q = re(q, Y, j, E, C[m + 3], 14, -187363961), E = re(E, q, Y, j, C[m + 8], 20, 1163531501), j = re(j, E, q, Y, C[m + 13], 5, -1444681467), Y = re(Y, j, E, q, C[m + 2], 9, -51403784), q = re(q, Y, j, E, C[m + 7], 14, 1735328473), j = Tt(j, E = re(E, q, Y, j, C[m + 12], 20, -1926607734), q, Y, C[m + 5], 4, -378558), Y = Tt(Y, j, E, q, C[m + 8], 11, -2022574463), q = Tt(q, Y, j, E, C[m + 11], 16, 1839030562), E = Tt(E, q, Y, j, C[m + 14], 23, -35309556), j = Tt(j, E, q, Y, C[m + 1], 4, -1530992060), Y = Tt(Y, j, E, q, C[m + 4], 11, 1272893353), q = Tt(q, Y, j, E, C[m + 7], 16, -155497632), E = Tt(E, q, Y, j, C[m + 10], 23, -1094730640), j = Tt(j, E, q, Y, C[m + 13], 4, 681279174), Y = Tt(Y, j, E, q, C[m], 11, -358537222), q = Tt(q, Y, j, E, C[m + 3], 16, -722521979), E = Tt(E, q, Y, j, C[m + 6], 23, 76029189), j = Tt(j, E, q, Y, C[m + 9], 4, -640364487), Y = Tt(Y, j, E, q, C[m + 12], 11, -421815835), q = Tt(q, Y, j, E, C[m + 15], 16, 530742520), j = At(j, E = Tt(E, q, Y, j, C[m + 2], 23, -995338651), q, Y, C[m], 6, -198630844), Y = At(Y, j, E, q, C[m + 7], 10, 1126891415), q = At(q, Y, j, E, C[m + 14], 15, -1416354905), E = At(E, q, Y, j, C[m + 5], 21, -57434055), j = At(j, E, q, Y, C[m + 12], 6, 1700485571), Y = At(Y, j, E, q, C[m + 3], 10, -1894986606), q = At(q, Y, j, E, C[m + 10], 15, -1051523), E = At(E, q, Y, j, C[m + 1], 21, -2054922799), j = At(j, E, q, Y, C[m + 8], 6, 1873313359), Y = At(Y, j, E, q, C[m + 15], 10, -30611744), q = At(q, Y, j, E, C[m + 6], 15, -1560198380), E = At(E, q, Y, j, C[m + 13], 21, 1309151649), j = At(j, E, q, Y, C[m + 4], 6, -145523070), Y = At(Y, j, E, q, C[m + 11], 10, -1120210379), q = At(q, Y, j, E, C[m + 2], 15, 718787259), E = At(E, q, Y, j, C[m + 9], 21, -343485551), j = se(j, D), E = se(E, dt), q = se(q, yt), Y = se(Y, at);
          return [j, E, q, Y];
        }(function(C) {
          var V, m = [];
          for (m[(C.length >> 2) - 1] = void 0, V = 0; V < m.length; V += 1) m[V] = 0;
          var D = 8 * C.length;
          for (V = 0; V < D; V += 8) m[V >> 5] |= (255 & C[V / 8]) << V % 32;
          return m;
        }(A), 8 * A.length));
      }), ce = function(A, R, N) {
        var C = R && N || 0;
        typeof A == "string" && (R = A === "binary" ? new Array(16) : null, A = null);
        var V = (A = A || {}).random || (A.rng || _t)();
        if (V[6] = 15 & V[6] | 64, V[8] = 63 & V[8] | 128, R) for (var m = 0; m < 16; ++m) R[C + m] = V[m];
        return R || Ot(V);
      };
      function Ct(A, R, N, C) {
        switch (A) {
          case 0:
            return R & N ^ ~R & C;
          case 1:
          case 3:
            return R ^ N ^ C;
          case 2:
            return R & N ^ R & C ^ N & C;
        }
      }
      function mt(A, R) {
        return A << R | A >>> 32 - R;
      }
      const jt = Xt("v5", 80, function(A) {
        var R = [1518500249, 1859775393, 2400959708, 3395469782], N = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        if (typeof A == "string") {
          var C = unescape(encodeURIComponent(A));
          A = new Array(C.length);
          for (var V = 0; V < C.length; V++) A[V] = C.charCodeAt(V);
        }
        A.push(128);
        var m = A.length / 4 + 2, D = Math.ceil(m / 16), dt = new Array(D);
        for (V = 0; V < D; V++) {
          dt[V] = new Array(16);
          for (var yt = 0; yt < 16; yt++) dt[V][yt] = A[64 * V + 4 * yt] << 24 | A[64 * V + 4 * yt + 1] << 16 | A[64 * V + 4 * yt + 2] << 8 | A[64 * V + 4 * yt + 3];
        }
        for (dt[D - 1][14] = 8 * (A.length - 1) / Math.pow(2, 32), dt[D - 1][14] = Math.floor(dt[D - 1][14]), dt[D - 1][15] = 8 * (A.length - 1) & 4294967295, V = 0; V < D; V++) {
          for (var at = new Array(80), j = 0; j < 16; j++) at[j] = dt[V][j];
          for (j = 16; j < 80; j++) at[j] = mt(at[j - 3] ^ at[j - 8] ^ at[j - 14] ^ at[j - 16], 1);
          var E = N[0], q = N[1], Y = N[2], Oe = N[3], be = N[4];
          for (j = 0; j < 80; j++) {
            var Ne = Math.floor(j / 20), Ve = mt(E, 5) + Ct(Ne, q, Y, Oe) + be + R[Ne] + at[j] >>> 0;
            be = Oe, Oe = Y, Y = mt(q, 30) >>> 0, q = E, E = Ve;
          }
          N[0] = N[0] + E >>> 0, N[1] = N[1] + q >>> 0, N[2] = N[2] + Y >>> 0, N[3] = N[3] + Oe >>> 0, N[4] = N[4] + be >>> 0;
        }
        return [N[0] >> 24 & 255, N[0] >> 16 & 255, N[0] >> 8 & 255, 255 & N[0], N[1] >> 24 & 255, N[1] >> 16 & 255, N[1] >> 8 & 255, 255 & N[1], N[2] >> 24 & 255, N[2] >> 16 & 255, N[2] >> 8 & 255, 255 & N[2], N[3] >> 24 & 255, N[3] >> 16 & 255, N[3] >> 8 & 255, 255 & N[3], N[4] >> 24 & 255, N[4] >> 16 & 255, N[4] >> 8 & 255, 255 & N[4]];
      });
    }, 542(d, M, K) {
      function Pt(Et, Z) {
        var kt = Object.keys(Et);
        if (Object.getOwnPropertySymbols) {
          var Ut = Object.getOwnPropertySymbols(Et);
          Z && (Ut = Ut.filter(function(Wt) {
            return Object.getOwnPropertyDescriptor(Et, Wt).enumerable;
          })), kt.push.apply(kt, Ut);
        }
        return kt;
      }
      function pt(Et) {
        for (var Z = 1; Z < arguments.length; Z++) {
          var kt = arguments[Z] != null ? arguments[Z] : {};
          Z % 2 ? Pt(Object(kt), !0).forEach(function(Ut) {
            _t(Et, Ut, kt[Ut]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(Et, Object.getOwnPropertyDescriptors(kt)) : Pt(Object(kt)).forEach(function(Ut) {
            Object.defineProperty(Et, Ut, Object.getOwnPropertyDescriptor(kt, Ut));
          });
        }
        return Et;
      }
      function _t(Et, Z, kt) {
        return (Z = function(Ut) {
          var Wt = function(Xt) {
            if (typeof Xt != "object" || !Xt) return Xt;
            var se = Xt[Symbol.toPrimitive];
            if (se !== void 0) {
              var oe = se.call(Xt, "string");
              if (typeof oe != "object") return oe;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(Xt);
          }(Ut);
          return typeof Wt == "symbol" ? Wt : Wt + "";
        }(Z)) in Et ? Object.defineProperty(Et, Z, { value: kt, enumerable: !0, configurable: !0, writable: !0 }) : Et[Z] = kt, Et;
      }
      function Kt(Et, Z, kt, Ut, Wt, Xt, se) {
        try {
          var oe = Et[Xt](se), qt = oe.value;
        } catch (re) {
          return void kt(re);
        }
        oe.done ? Z(qt) : Promise.resolve(qt).then(Ut, Wt);
      }
      function Ht(Et) {
        return function() {
          var Z = this, kt = arguments;
          return new Promise(function(Ut, Wt) {
            var Xt = Et.apply(Z, kt);
            function se(qt) {
              Kt(Xt, Ut, Wt, se, oe, "next", qt);
            }
            function oe(qt) {
              Kt(Xt, Ut, Wt, se, oe, "throw", qt);
            }
            se(void 0);
          });
        };
      }
      var Ot;
      Ot = () => (() => {
        var Et = { n: (J) => {
          var b = J && J.__esModule ? () => J.default : () => J;
          return Et.d(b, { a: b }), b;
        }, d: (J, b) => {
          for (var nt in b) Et.o(b, nt) && !Et.o(J, nt) && Object.defineProperty(J, nt, { enumerable: !0, get: b[nt] });
        }, o: (J, b) => Object.prototype.hasOwnProperty.call(J, b), r: (J) => {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(J, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(J, "__esModule", { value: !0 });
        } }, Z = {};
        Et.r(Z), Et.d(Z, { AssertUtils: () => Q, BrowserNotification: () => At, Decorator: () => ce, Err: () => te, Evt: () => D, I18N: () => Oe, Logger: () => qt, NotificationItemsContent: () => be, Notifications: () => u, Signal: () => f, clearInterval: () => Qt, clearTimeout: () => we, createBrowserNotifications: () => mt, createHttp: () => Y, createLogger: () => Tt, createNotifications: () => G, ensureError: () => de, setInterval: () => Te, setTimeout: () => Fe });
        var kt = K(322), Ut = Et.n(kt), Wt = K(327), Xt = "*********", se = ["authorization"];
        class oe {
          constructor(b) {
            this.maskKeys = b;
          }
          tryJSONParse(b) {
            try {
              return JSON.parse(b);
            } catch {
              return;
            }
          }
          copiedObj(b) {
            try {
              return JSON.parse(JSON.stringify(b));
            } catch {
              return b;
            }
          }
          maskObjectProperty(b) {
            var nt = b;
            Object.keys(b).forEach((it) => {
              typeof b[it] == "object" && b[it] !== null ? this.maskObjectProperty(b[it]) : nt[it] = Xt;
            });
          }
          maskLogData(b) {
            Object.keys(b).forEach((nt) => {
              typeof b[nt] == "object" && b[nt] !== null ? this.maskKeys[nt] ? this.maskObjectProperty(b[nt]) : this.maskLogData(b[nt]) : (this.maskKeys[nt] && typeof b[nt] == "string" || nt === "value" && this.maskKeys[b.name]) && (b[nt] = Xt);
            });
          }
          maskAuthorizationValues(b) {
            if (b && typeof b == "object") if (Array.isArray(b)) b.forEach((x) => this.maskAuthorizationValues(x));
            else {
              var nt = b, it = /\b[A-Za-z0-9-_]{1,15000}\.[A-Za-z0-9-_]{1,15000}\.[A-Za-z0-9-_]{1,15000}\b/g, st = new RegExp("\\b(".concat(se.join("|"), ")\\s*:\\s*[A-Za-z0-9-_.]+"), "gi");
              for (var [ht, It] of Object.entries(nt)) if (typeof It != "object" || It instanceof Date) {
                if (se.includes(ht.toLowerCase())) nt[ht] = Xt;
                else if (typeof It == "string") {
                  var T = It.replace(st, "$1: ".concat(Xt));
                  T.includes("eyJ") && (T = T.replace(it, Xt)), nt[ht] = T;
                }
              } else this.maskAuthorizationValues(It);
            }
          }
          maskPIIInformation(b) {
            var nt = b[b.length - 1], it = typeof nt == "string" ? this.tryJSONParse(nt) : this.copiedObj(nt);
            it && typeof it == "object" && (this.maskAuthorizationValues(it), this.maskLogData(it), b.splice(b.length - 1, 1, it));
          }
        }
        var qt, re = function() {
          for (var J = arguments.length, b = new Array(J), nt = 0; nt < J; nt++) b[nt] = arguments[nt];
          return b.map((it) => typeof it == "string" ? it : JSON.stringify(it));
        };
        function Tt(J, b) {
          var nt = new qt.Service(J, b);
          return qt.POOL.addLogger(nt), nt;
        }
        (function(J) {
          J.MAX_LOGS_SIZE = 1048576, J.LS_LOGS_KEY = "uuip-client-logs";
          var b, nt = "<uuip-eol>", it = /[\u0100-\uFFFF]/g, st = "yyyy-LL-dd HH:mm:ss:SSS";
          J.defaultSaveIntervalMilliSeconds = 5e3, function(It) {
            It[It.Trace = 1] = "Trace", It[It.Debug = 2] = "Debug", It[It.Warn = 3] = "Warn", It[It.Error = 4] = "Error", It[It.Fatal = 5] = "Fatal";
          }(b = J.Level || (J.Level = {})), J.Service = class {
            constructor(It, T) {
              this.loggerEmitter = Ut()(), this.prefix = It, this.maskKeys = T;
            }
            log(It) {
              for (var T = arguments.length, x = new Array(T > 1 ? T - 1 : 0), U = 1; U < T; U++) x[U - 1] = arguments[U];
              this.maskKeys && typeof this.maskKeys == "object" && ((Bt, Ee) => {
                new oe(Ee).maskPIIInformation(Bt);
              })(x, this.maskKeys);
              var $ = re(this.prefix ? ["".concat(this.prefix), ...x] : x), H = Date.now(), rt = Wt.DateTime.fromMillis(H).toFormat(st);
              switch (It) {
                case J.Level.Trace:
                  console.info(rt, ...$);
                  break;
                case J.Level.Debug:
                  console.log(rt, ...$);
                  break;
                case J.Level.Warn:
                  console.warn(rt, ...$);
                  break;
                case J.Level.Error:
                case J.Level.Fatal:
                  console.error(rt, ...$);
                  break;
                default:
                  console.log(...$);
              }
              var Nt = { pfx: this.prefix, msgs: [...x], ts: H, lvl: It };
              this.emit("add", Nt);
            }
            info() {
              for (var It = arguments.length, T = new Array(It), x = 0; x < It; x++) T[x] = arguments[x];
              this.log(b.Trace, ...T);
            }
            debug() {
              for (var It = arguments.length, T = new Array(It), x = 0; x < It; x++) T[x] = arguments[x];
              this.log(b.Debug, ...T);
            }
            warn() {
              for (var It = arguments.length, T = new Array(It), x = 0; x < It; x++) T[x] = arguments[x];
              this.log(b.Warn, ...T);
            }
            error() {
              for (var It = arguments.length, T = new Array(It), x = 0; x < It; x++) T[x] = arguments[x];
              this.log(b.Error, ...T);
            }
            emit(It) {
              for (var T = arguments.length, x = new Array(T > 1 ? T - 1 : 0), U = 1; U < T; U++) x[U - 1] = arguments[U];
              this.loggerEmitter.emit(It, ...x);
            }
            addEventListener(It, T) {
              return this.loggerEmitter.on(It, T), () => {
                this.removeEventListener(It, T);
              };
            }
            removeEventListener(It, T) {
              this.loggerEmitter.off(It, T);
            }
          };
          class ht {
            constructor() {
              this.loggers = /* @__PURE__ */ new Map(), this.logsCollectionString = "", this.prefixedLogsCollections = {}, this.lastSaveTime = Date.now(), this.config = { saveIntervalMilliSeconds: J.defaultSaveIntervalMilliSeconds }, this.logRecordsSerializedLength = 0, this.flush = () => {
                this.save(!1);
              }, this.onLoggerAddRecord = (T) => {
                this.addLogRecord(T), this.save(!0);
              }, this.restore();
            }
            static getSerializedJsonLogRecordBytesSize() {
              var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", x = T.length;
              if (x) {
                var U = T.replace(it, "").length;
                return 1 * U + 2 * (x - U);
              }
              return x;
            }
            get serializedJsonLogsBytesSize() {
              var T = this.logsCollectionString.split(nt).length;
              return 2 + this.logRecordsSerializedLength + 1 * (T - 1);
            }
            save() {
              var T = !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0], x = Date.now();
              T && x - this.lastSaveTime < this.config.saveIntervalMilliSeconds || (this.lastSaveTime = x, window.sessionStorage.setItem(J.LS_LOGS_KEY, this.logsCollectionString));
            }
            restore() {
              try {
                var T = window.sessionStorage.getItem(J.LS_LOGS_KEY) || "";
                this.logsCollectionString = T, this.logRecordsSerializedLength += ht.getSerializedJsonLogRecordBytesSize(this.logsCollectionString), this.restorePreFixedLogs();
              } catch (x) {
                console.warn("Logger failed read logs from sessionStorage: ", x);
              }
            }
            getLogObjectFromString() {
              try {
                if (this.logsCollectionString !== "") return JSON.parse("[".concat(this.logsCollectionString.split(nt).join(","), "]"));
              } catch {
                console.log("Error parsing local storage data");
              }
              return {};
            }
            restorePreFixedLogs() {
              var T = this.getLogObjectFromString();
              T && Array.isArray(T) && T.length > 0 && T.forEach((x) => {
                this.addPreFixedLogs(x), this.removeOversized();
              });
            }
            addPreFixedLogs(T) {
              this.prefixedLogsCollections[T.pfx] = this.prefixedLogsCollections[T.pfx] || /* @__PURE__ */ new Set(), this.prefixedLogsCollections[T.pfx].add(T);
            }
            removeOversized() {
              for (; this.serializedJsonLogsBytesSize > J.MAX_LOGS_SIZE && this.logsCollectionString !== ""; ) this.removeLogRecord();
            }
            removeTextFromString(T, x, U) {
              return "".concat(T.slice(0, x)).concat(T.slice(U + x));
            }
            addLogRecord(T) {
              try {
                var x = JSON.stringify(T), U = this.logsCollectionString;
                this.logsCollectionString = U == null ? void 0 : U.concat("".concat(U.trim() !== "" ? nt : "").concat(x));
              } catch (H) {
                var $ = JSON.stringify(T);
                this.logsCollectionString = $, console.warn("Logger failed read logs from sessionStorage: ", H);
              }
              this.logRecordsSerializedLength += ht.getSerializedJsonLogRecordBytesSize(JSON.stringify(T)), this.addPreFixedLogs(T), this.removeOversized();
            }
            removeLogRecord() {
              if (this.logsCollectionString !== "") {
                var T = this.logsCollectionString.indexOf(nt);
                if (T !== -1) {
                  var x = this.logsCollectionString.substring(0, T), U = T + 10, $ = this.removeTextFromString(this.logsCollectionString, 0, U);
                  this.logsCollectionString = $, this.logRecordsSerializedLength -= ht.getSerializedJsonLogRecordBytesSize(x);
                  try {
                    var H = JSON.parse(x);
                    this.prefixedLogsCollections[H.pfx] && this.prefixedLogsCollections[H.pfx].forEach((rt) => {
                      rt.ts === H.ts && this.prefixedLogsCollections[H.pfx].delete(rt);
                    });
                  } catch (rt) {
                    console.warn("Logger failed to read/parse the first logs from sessionStorage: ", rt);
                  }
                }
              }
            }
            removePreFixedLogs(T) {
              var x = this.getLogObjectFromString();
              T.forEach((U) => {
                var $ = x.findIndex((H) => H.pfx === U.pfx);
                $ !== -1 && (x.splice($, 1), this.logRecordsSerializedLength -= ht.getSerializedJsonLogRecordBytesSize(JSON.stringify(U)), this.prefixedLogsCollections[U.pfx] && this.prefixedLogsCollections[U.pfx].has(U) && this.prefixedLogsCollections[U.pfx].delete(U));
              }), this.logsCollectionString = x.map((U) => JSON.stringify(U)).join(nt);
            }
            static getLogRecordReadable(T) {
              return T.ts ? { prefix: T.pfx, messages: T.msgs, timestamp: Wt.DateTime.fromMillis(T.ts).toFormat(st), level: b[T.lvl] } : {};
            }
            static getLogsReadableJson(T) {
              var x = (U) => U.map(($) => ht.getLogRecordReadable($));
              return JSON.stringify(Array.isArray(T) ? x(T) : Object.keys(T).reduce((U, $) => (U[$] = x(T[$]), U), {}), null, 2);
            }
            static getLogsReadableText(T) {
              var x = (U) => U.reduce(($, H) => {
                var rt = ht.getLogRecordReadable(H);
                return rt && ($ += "".concat(rt.timestamp, " ").concat(rt.prefix, " ").concat(rt.level, " ").concat(re(rt.messages).join(" "), ` \r
`)), $;
              }, "");
              return Array.isArray(T) ? x(T) : Object.keys(T).reduce((U, $) => (U += '[SERVICE "'.concat($, '" LOGS]: ')) + x(T[$]), "");
            }
            static getLogsUrl(T) {
              return "data:text/plain;charset=utf-8,".concat(encodeURIComponent(T));
            }
            static browserDownload(T, x) {
              try {
                if (document && document.createElement) {
                  var U = document.createElement("a");
                  U.setAttribute("href", T), U.setAttribute("download", x), U.style.display = "none", document.body.appendChild(U), U.click(), document.body.removeChild(U);
                } else console.warn("Browser is not supported to download logs");
              } catch {
              }
            }
            addLogger(T) {
              this.loggers.set(T.prefix, T), T.removeEventListener("add", this.onLoggerAddRecord), T.addEventListener("add", this.onLoggerAddRecord);
            }
            getAllLogsJsonUrl() {
              return ht.getLogsUrl(ht.getLogsReadableJson(this.getLogObjectFromString()));
            }
            getAllPrefixedLogsJsonUrl() {
              return ht.getLogsUrl(ht.getLogsReadableJson(this.getAllPrefixedLogsCollections()));
            }
            getPrefixedLogsJsonUrl(T) {
              return ht.getLogsUrl(ht.getLogsReadableJson(this.getPrefixedLogsCollection(T)));
            }
            getAllLogsTextUrl() {
              return ht.getLogsUrl(ht.getLogsReadableText(this.getLogObjectFromString()));
            }
            getPrefixedLogsTextUrl(T) {
              return ht.getLogsUrl(ht.getLogsReadableText(this.getPrefixedLogsCollection(T)));
            }
            browserDownloadAllLogsJson() {
              ht.browserDownload(this.getAllLogsJsonUrl(), "".concat(/* @__PURE__ */ new Date(), "_all_logs.json"));
            }
            browserDownloadAllPrefixedLogsJson() {
              ht.browserDownload(this.getAllPrefixedLogsJsonUrl(), "".concat(/* @__PURE__ */ new Date(), "_all_prefixed_logs.json"));
            }
            browserDownloadPrefixedLogsJson(T) {
              ht.browserDownload(this.getPrefixedLogsJsonUrl(T), "".concat(/* @__PURE__ */ new Date(), "_").concat(T, "_logs.json"));
            }
            browserDownloadAllLogsText() {
              ht.browserDownload(this.getAllLogsTextUrl(), "".concat(/* @__PURE__ */ new Date(), "_all_logs.log"));
            }
            browserDownloadPrefixedLogsText(T) {
              ht.browserDownload(this.getPrefixedLogsTextUrl(T), "".concat(/* @__PURE__ */ new Date(), "_").concat(T, "_logs.log"));
            }
            cleanupAllLogs() {
              this.logRecordsSerializedLength = 0, this.logsCollectionString = "", Object.keys(this.prefixedLogsCollections).forEach((T) => this.prefixedLogsCollections[T] = /* @__PURE__ */ new Set()), this.save(!0);
            }
            cleanupPrefixedLogs(T) {
              var x = this.getPrefixedLogsCollection(T);
              this.removePreFixedLogs(x), this.prefixedLogsCollections[T] = /* @__PURE__ */ new Set(), this.save(!0);
            }
            getAllPrefixedLogsCollections() {
              return Object.keys(this.prefixedLogsCollections).reduce((T, x) => (T[x] = this.getPrefixedLogsCollection(x), T), {});
            }
            getPrefixedLogsCollection(T) {
              return Array.from(this.prefixedLogsCollections[T] || /* @__PURE__ */ new Set());
            }
          }
          J.ServicesPool = ht, J.POOL = new J.ServicesPool();
        })(qt || (qt = {}));
        var At, te, ce, Ct = Tt("unified-ui-platform-sdk", { title: !0, text: !0 });
        function mt(J) {
          return new At.Service(J);
        }
        function jt(J, b) {
          if (J.descriptor = J.descriptor || Object.getOwnPropertyDescriptor(J.target, J.key), typeof J.descriptor.value != "function") return console.warn(J.key, "Decorator must be used on function"), J.descriptor;
          var nt = J.descriptor.value, it = J.target.constructor.name;
          return J.descriptor.value = function() {
            for (var st = [], ht = 0; ht < arguments.length; ht++) st[ht] = arguments[ht];
            return b.call(this, nt, st, it);
          }, J.descriptor;
        }
        function A() {
          var J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250;
          return function(b, nt, it) {
            var st;
            return jt({ target: b, key: nt, descriptor: it }, function(ht, It) {
              clearTimeout(st), st = window.setTimeout(() => {
                clearTimeout(st), ht.apply(this, It);
              }, J);
            });
          };
        }
        function R() {
          return (J, b) => {
            var nt = { get() {
              return new D(this, b !== void 0 ? b : J.key);
            }, enumerable: !0, configurable: !0 };
            return b !== void 0 ? Object.defineProperty(J, b, nt) : { kind: "method", placement: "prototype", key: J.key, descriptor: nt };
          };
        }
        function N(J) {
          var b = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1];
          return function(nt, it, st) {
            return jt({ target: nt, key: it, descriptor: st }, function() {
              var ht = Ht(function* (It, T) {
                var x = "_".concat(it, "_exec_flag");
                if (!b || !this[x]) {
                  var U = (H) => {
                    if (this[x] = H, typeof J == "function") J.call(this, { isExec: H, ctx: this });
                    else {
                      var rt = J;
                      H ? rt.before && rt.before.call(this, this) : rt.after && rt.after.call(this, this);
                    }
                  };
                  U(!0);
                  var $ = It.apply(this, T);
                  $ instanceof Promise ? $.then(() => U(!1)).catch(() => U(!1)) : (console.warn("Must be async function to use [@Executing] decorator"), U(!1));
                }
              });
              return function(It, T) {
                return ht.apply(this, arguments);
              };
            }());
          };
        }
        function C(J) {
          return function(b, nt, it) {
            return jt({ target: b, key: nt, descriptor: it }, function() {
              var st = Ht(function* (ht, It, T) {
                var x = this, U = function() {
                  var H = Ht(function* (rt) {
                    rt.id && typeof rt.id == "string" && rt.isErr === "yes" || (typeof rt == "string" || rt instanceof Error ? rt = new te.Message("system", rt) : (console.warn("Err must be 'string' or 'new Error()' instance"), rt = new te.Message("system", "")));
                    var Nt = rt;
                    Nt.ctx = x;
                    var Bt = "Error] ".concat(T, ".").concat(nt, " [").concat(Nt.id, "]: ").concat(Nt.message);
                    if (typeof J == "function") {
                      var Ee = J;
                      console.log("[Handled".concat(Bt));
                      var me = Ee.call(x, Nt);
                      me instanceof Promise && (yield me);
                    } else {
                      var he = J;
                      if (he[Nt.id]) {
                        console.log("[Handled".concat(Bt));
                        var Xe = he[Nt.id].call(x, Nt);
                        Xe instanceof Promise && (yield Xe);
                      } else if (he.handle) {
                        console.log("[Handled".concat(Bt));
                        var Yt = he.handle.call(x, Nt);
                        Yt instanceof Promise && (yield Yt);
                      } else console.warn("[Unhandled ".concat(Bt));
                      if (he.fallback) {
                        var $e = he.fallback.call(x, Nt);
                        $e instanceof Promise && (yield $e);
                      }
                    }
                  });
                  return function(rt) {
                    return H.apply(this, arguments);
                  };
                }();
                try {
                  var $ = ht.apply(x, It);
                  return $ instanceof Promise ? new Promise((H) => {
                    $.then(H).catch(function() {
                      var rt = Ht(function* (Nt) {
                        yield U(Nt), H(void 0);
                      });
                      return function(Nt) {
                        return rt.apply(this, arguments);
                      };
                    }());
                  }) : $;
                } catch (H) {
                  return void (yield U(H));
                }
              });
              return function(ht, It, T) {
                return st.apply(this, arguments);
              };
            }());
          };
        }
        function V() {
          return function(J, b, nt) {
            return jt({ target: J, key: b, descriptor: nt }, function(it, st) {
              var ht = "_".concat(b, "_once_flag");
              this[ht] || (this[ht] = !0, it.call(this, st));
            });
          };
        }
        function m() {
          var J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 16.666666666666668;
          return function(b, nt, it) {
            var st, ht = Date.now();
            return jt({ target: b, key: nt, descriptor: it }, function(It, T) {
              var x = this, U = function() {
                for (var $ = arguments.length, H = new Array($), rt = 0; rt < $; rt++) H[rt] = arguments[rt];
                var Nt = Date.now();
                window.clearTimeout(st), !ht || Nt - ht >= J ? (ht = Nt, It.apply(x, H)) : st = window.setTimeout(() => U(...H), J - (Nt - ht));
              };
              U(...T);
            });
          };
        }
        (function(J) {
          class b {
            static get isBrowserNotificationPromiseSupported() {
              try {
                window.Notification.requestPermission().then();
              } catch {
                return !1;
              }
              return !0;
            }
            constructor(it) {
              this.defaultOptions = it || {};
            }
            get isBrowserNotificationSupported() {
              return "Notification" in window;
            }
            get isBrowserNotificationIconSupported() {
              return this.isBrowserNotificationSupported && "icon" in window.Notification.prototype;
            }
            get isBrowserNotificationImageSupported() {
              return this.isBrowserNotificationSupported && "image" in window.Notification.prototype;
            }
            get isBrowserNotificationBadgeSupported() {
              return this.isBrowserNotificationSupported && "badge" in window.Notification.prototype;
            }
            get isPermissionGranted() {
              return window.Notification.permission === "granted";
            }
            get isPermissionDenied() {
              return window.Notification.permission === "denied";
            }
            get isPermissionUnknown() {
              return !this.isPermissionGranted && !this.isPermissionDenied;
            }
            requestNotificationUserPermission() {
              var it = this;
              return Ht(function* () {
                it.isBrowserNotificationSupported ? b.isBrowserNotificationPromiseSupported ? yield window.Notification.requestPermission() : yield new Promise((st) => window.Notification.requestPermission((ht) => st(ht))) : Ct.warn("Browser notification is not supported...");
              })();
            }
            fire(it, st) {
              return new window.Notification(it, pt(pt({}, this.defaultOptions), st || {}));
            }
          }
          J.Service = b;
        })(At || (At = {})), function(J) {
          class b extends Error {
            constructor(st, ht) {
              super(), this.isErr = "yes", this.id = st, this.stack = new Error().stack, typeof ht == "string" ? this.message = ht : ht instanceof Error ? (this.message = ht.message, this.name = ht.name) : this.message = "";
            }
          }
          J.Message = b;
          class nt extends Error {
            constructor(st, ht) {
              super(), this.isErr = "yes", this.id = st, this.stack = new Error().stack, this.details = ht;
            }
          }
          J.Details = nt;
        }(te || (te = {})), function(J) {
          J.Debounce = A, J.Evt = R, J.Exec = N, J.Handle = C, J.Once = V, J.Throttle = m;
        }(ce || (ce = {}));
        class D {
          constructor(b, nt) {
            this.target = b, this.eventName = nt;
          }
          emit(b) {
            var nt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { bubbles: !0, composed: !0, cancelable: !1 };
            this.target.dispatchEvent(new CustomEvent(this.eventName, pt({ detail: b }, nt)));
          }
        }
        var dt = K(901), yt = Et.n(dt), at = K(960), j = "uuip", E = "1.0", q = "1.0";
        function Y(J) {
          var b = yt().create();
          return b.accessToken = J, b.interceptors.request.use((nt) => {
            if (!nt.headers.Authorization && b.accessToken && (nt.headers.Authorization = "Bearer ".concat(b.accessToken)), !nt.headers.TrackingID) {
              var it = (0, at.v1)();
              nt.headers.TrackingID = "".concat(j, "_").concat(it, "_").concat(E, ":").concat(q);
            }
            return nt.headers["Content-Type"] || (nt.headers["Content-Type"] = "application/json"), nt;
          }), b;
        }
        var Oe, be, Ne = K(545), Ve = Et.n(Ne), He = K(176), S = Et.n(He), r = K(855), n = Et.n(r);
        (function(J) {
          J.createService = (b) => {
            var nt = Ve().createInstance(), it = b && b.backend ? b.backend : new (n())();
            nt.use(it);
            var st = b && b.languageDetector ? b.languageDetector : new (S())();
            return nt.use(st), b && b.logger && nt.use({ log: "log" in b.logger ? b.logger.log : b.logger.info, warn: b.logger.warn, error: b.logger.error, type: "logger" }), nt;
          }, J.mergeServiceInitOptions = function() {
            for (var b = arguments.length, nt = new Array(b), it = 0; it < b; it++) nt[it] = arguments[it];
            return Object.assign.call(null, {}, ...nt);
          }, J.createMixin = (b) => {
            var nt = "i18n" in b ? b.i18n : J.createService(), it = "i18nInitOptions" in b ? b.i18nInitOptions : null;
            it || Ct.info("i18n mixin instance waiting service initialization outside...");
            var st = !1;
            return (ht) => class extends ht {
              constructor() {
                super(...arguments), this.onI18NInitialized = (It) => this.requestUpdate(), this.onI18NLanguageChanged = (It) => this.requestUpdate(), this.t = Ve().t.bind(nt);
              }
              connectedCallback() {
                super.connectedCallback && super.connectedCallback(), nt.on("initialized", this.onI18NInitialized), nt.on("languageChanged", this.onI18NLanguageChanged), nt.isInitialized || st || !it || (st = !0, nt.init(it).finally(() => st = !1));
              }
              disconnectedCallback() {
                nt.off("initialized", this.onI18NInitialized), nt.off("languageChanged", this.onI18NLanguageChanged), super.disconnectedCallback && super.disconnectedCallback();
              }
            };
          };
        })(Oe || (Oe = {})), function(J) {
          J.DataController = class {
            constructor(b) {
              this.localization = { closeButtonText: "Close" }, this.type = b.type, this.text = b.text, this.link = b.link, this.linkName = b.linkName, this.linkTooltip = b.linkTooltip, this.iconDetail = b.iconDetail, this.linkHandler = b.linkHandler, this.clickHandler = b.clickHandler, this.errorDetail = b.errorDetail, this.taskId = b.taskId, this.localization = b.localization || this.localization, this.dismissHandler = b.dismissHandler, this.actions = b.actions, this.lineClamp = b.lineClamp;
            }
          };
        }(be || (be = {}));
        var u, f, k = K(497), P = Et.n(k);
        function G() {
          var J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = new u.Service();
          return b.updateConfig(J), b;
        }
        (function(J) {
          var b, nt;
          (function(T) {
            var x, U, $;
            (function(H) {
              H.Info = "info", H.Warn = "warn", H.Error = "error", H.Success = "success", H.Chat = "chat", H.Default = "default";
            })(x = T.Type || (T.Type = {})), T.TYPES = Object.values(x), function(H) {
              H.Silent = "silent", H.AutoDismiss = "autodismiss", H.Acknowledge = "acknowledge";
            }(U = T.Mode || (T.Mode = {})), T.MODES = Object.values(U), function(H) {
              H.Added = "added", H.Pended = "pended", H.Activated = "activated", H.Deactivated = "deactivated", H.Removed = "removed";
            }($ = T.Status || (T.Status = {})), T.StatusWeight = { [$.Added]: 0, [$.Pended]: 1, [$.Activated]: 2, [$.Deactivated]: 3, [$.Removed]: 4 }, T.STATUSES = Object.values($), function(H) {
              H.User = "user_add";
            }(T.AddEventReason || (T.AddEventReason = {})), function(H) {
              H.ServiceAutoPropagate = "service_auto_propagate_pending", H.ServiceAutoDismiss = "service_autodismiss_pending", H.UserSilent = "user_silent_pending";
            }(T.PendingEventReason || (T.PendingEventReason = {})), function(H) {
              H.ServiceAutoPropagate = "service_auto_propagate_activate";
            }(T.ActivateEventReason || (T.ActivateEventReason = {})), function(H) {
              H.UserNegative = "user_negative_deactivate", H.UserPositive = "user_positive_deactivate", H.UserNeutral = "user_neutral_deactivate";
            }(T.DeactivateEventReason || (T.DeactivateEventReason = {})), function(H) {
              H.User = "user_remove";
            }(T.RemoveEventReason || (T.RemoveEventReason = {}));
          })(b = J.ItemMeta || (J.ItemMeta = {})), function(T) {
            T.STATUS_EVENTS = ["add", "pending", "activate", "deactivate", "remove"], T.STATUS_EVENT_MAP = { add: b.Status.Added, pending: b.Status.Pended, activate: b.Status.Activated, deactivate: b.Status.Deactivated, remove: b.Status.Removed }, T.DISABLED_ITEM_MODE = { [b.Mode.Silent]: !1, [b.Mode.AutoDismiss]: !1, [b.Mode.Acknowledge]: !1 }, T.ACTIVATED_ITEM_MODE_LIMIT = { [b.Mode.Silent]: 0, [b.Mode.AutoDismiss]: 10, [b.Mode.Acknowledge]: 1 }, T.AUTO_DISMISS_TIMEOUT = 5e3;
          }(nt = J.ServiceMeta || (J.ServiceMeta = {}));
          class it {
            constructor() {
              this.hubEmitter = Ut()();
            }
            emit(x) {
              for (var U = arguments.length, $ = new Array(U > 1 ? U - 1 : 0), H = 1; H < U; H++) $[H - 1] = arguments[H];
              this.hubEmitter.emit(x, ...$);
            }
            addEventListener(x, U) {
              this.hubEmitter.on(x, U);
            }
            addOnceEventListener(x, U) {
              this.hubEmitter.once(x, U);
            }
            removeEventListener(x, U) {
              this.hubEmitter.off(x, U);
            }
            removeAllEventListeners() {
              P()(this.hubEmitter);
            }
          }
          J.Item = class {
            get status() {
              return this._status;
            }
            get reason() {
              return this._reason;
            }
            get mode() {
              return this._mode;
            }
            validateAuxOptions(T) {
              var x = {};
              return T && T.AUTO_DISMISS_TIMEOUT !== void 0 && this.mode === b.Mode.AutoDismiss && (x = pt(pt({}, x), {}, { AUTO_DISMISS_TIMEOUT: T.AUTO_DISMISS_TIMEOUT })), x;
            }
            constructor(T, x) {
              this._serviceHubSubscriptions = [], this._itemEmitter = Ut()();
              var { type: U, mode: $, title: H, data: rt, timestamp: Nt } = T.data;
              this.type = U, this.title = H, this.data = rt, this._mode = $, this.timestamp = Nt || (/* @__PURE__ */ new Date()).toISOString(), this.datetime = Wt.DateTime.fromISO(this.timestamp).toLocaleString(Wt.DateTime.DATETIME_SHORT_WITH_SECONDS), this.options = Object.freeze(this.validateAuxOptions(T.options || {})), x && (this._serviceHubAdapter = x, this._status = b.Status.Added, this._reason = b.AddEventReason.User, this.bindItemHubListeners());
            }
            bindItemHubListeners() {
              if (this._serviceHubAdapter) {
                var T = (U, $, H) => {
                  this.timestamp in U && (this._status = $, this._reason = H, $ === b.Status.Removed && (this.unbindItemHubListeners(), this.removeAllEventListeners()), this.emit("statusUpdate", $, H));
                };
                this._serviceHubAdapter.addEventListener("statusServiceUpdateResponse", T), this._serviceHubSubscriptions.push(() => {
                  var U;
                  (U = this._serviceHubAdapter) === null || U === void 0 || U.removeEventListener("statusServiceUpdateResponse", T);
                });
                var x = (U, $) => {
                  this.timestamp in U && (this._mode = $, this.emit("modeUpdate", $));
                };
                this._serviceHubAdapter.addEventListener("modeStatusUpdateResponse", x), this._serviceHubSubscriptions.push(() => {
                  var U;
                  (U = this._serviceHubAdapter) === null || U === void 0 || U.removeEventListener("modeStatusUpdateResponse", x);
                });
              }
            }
            unbindItemHubListeners() {
              this._serviceHubSubscriptions && (this._serviceHubSubscriptions.forEach((T) => T()), this._serviceHubSubscriptions.length = 0);
            }
            deactivate(T) {
              this._status && b.StatusWeight[this._status] < b.StatusWeight[b.Status.Deactivated] ? this._serviceHubAdapter ? this._serviceHubAdapter.emit("statusServiceUpdateRequest", this, b.Status.Deactivated, T) : Ct.warn("Service hub adapter is not initialized for this notification item instance: ", this) : Ct.warn('Notification should have "'.concat(b.Status.Pended, '" or "').concat(b.Status.Activated, '" status to be able change status to "').concat(b.Status.Deactivated, '".Current notification status is "').concat(this._status, '". Ignoring this change'));
            }
            pending() {
              this._status === b.Status.Activated || this.mode !== b.Mode.Silent ? this._serviceHubAdapter ? this._serviceHubAdapter.emit("statusServiceUpdateRequest", this, b.Status.Pended, b.PendingEventReason.UserSilent) : Ct.warn("Service hub adapter is not initialized for this notification item instance: ", this) : Ct.warn('Notification should have "'.concat(b.Status.Activated, '" status or not "').concat(b.Mode.Silent, '" mode, to be able change status to "').concat(b.Status.Pended, '" and mode to "').concat(b.Mode.Silent, '".Current notification status is "').concat(this._status, '" and mode is "').concat(this.mode, '". Ignoring this change'));
            }
            emit(T) {
              for (var x = arguments.length, U = new Array(x > 1 ? x - 1 : 0), $ = 1; $ < x; $++) U[$ - 1] = arguments[$];
              this._itemEmitter.emit(T, ...U);
            }
            addEventListener(T, x) {
              this._itemEmitter.on(T, x);
            }
            addOnceEventListener(T, x) {
              this._itemEmitter.once(T, x);
            }
            removeEventListener(T, x) {
              this._itemEmitter.off(T, x);
            }
            removeAllEventListeners() {
              P()(this._itemEmitter);
            }
          };
          var st = function(T, x) {
            return [...T, ...x].sort(arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : () => 0);
          }, ht = (T, x) => T.reduce((U, $) => (x.indexOf($) === -1 && U.push($), U), []);
          class It {
            constructor() {
              this.emitter = Ut()(), this.map = {}, this.status = It.createStatus(), this.serviceConfig = { DISABLED_ITEM_MODE: pt({}, nt.DISABLED_ITEM_MODE), ACTIVATED_ITEM_MODE_LIMIT: pt({}, nt.ACTIVATED_ITEM_MODE_LIMIT), AUTO_DISMISS_TIMEOUT: nt.AUTO_DISMISS_TIMEOUT }, this.activeAutoDismissTimeoutRefs = {}, this.serviceHubAdapter = new it(), this.bindServiceHubEvents();
            }
            static mergeConfig(x) {
              for (var U = arguments.length, $ = new Array(U > 1 ? U - 1 : 0), H = 1; H < U; H++) $[H - 1] = arguments[H];
              if (!$.length) return x;
              var rt = $.shift(), Nt = (Ee) => Ee && typeof Ee == "object" && !Array.isArray(Ee);
              if (Nt(x) && Nt(rt)) for (var Bt in rt) Nt(rt[Bt]) ? (x[Bt] || Object.assign(x, { [Bt]: {} }), this.mergeConfig(x[Bt], rt[Bt])) : Object.assign(x, { [Bt]: rt[Bt] });
              return this.mergeConfig(x, ...$);
            }
            static createStatus() {
              return { [b.Status.Added]: this.createStatusHolderCollection(), [b.Status.Pended]: this.createStatusHolderCollection(), [b.Status.Activated]: this.createStatusHolderCollection(), [b.Status.Deactivated]: this.createStatusHolderCollection(), [b.Status.Removed]: this.createStatusHolderCollection() };
            }
            static createStatusHolderCollection() {
              return Object.assign([], pt(pt({ ids: [] }, this.createStatusHolderSubCollections(b.MODES)), this.createStatusHolderSubCollections(b.TYPES)));
            }
            static createStatusHolderSubCollections(x) {
              return pt({}, x.reduce((U, $) => (U[$] = [], U), {}));
            }
            updateNotificationsCollections() {
              var x = It.createStatus();
              this.status.added.ids.forEach((U) => {
                var $ = this.map[U];
                b.STATUSES.forEach((H) => {
                  this.status[H].ids.indexOf($.timestamp) !== -1 && (x[H].push($), x[H].ids.push(U), x[H][$.mode].push($), x[H][$.type].push($));
                });
              }), this.status = x;
            }
            setAutoDismiss(x) {
              var U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : () => {
              };
              this.prepareUpdateNotifications(x).forEach(($) => {
                var H;
                $.mode === b.Mode.AutoDismiss && (this.activeAutoDismissTimeoutRefs[$.timestamp] = window.setTimeout(() => U($), (H = $.options.AUTO_DISMISS_TIMEOUT) !== null && H !== void 0 ? H : this.serviceConfig.AUTO_DISMISS_TIMEOUT));
              });
            }
            removeAutoDismiss(x) {
              var U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : () => {
              };
              this.prepareUpdateNotifications(x).forEach(($) => {
                $.timestamp in this.activeAutoDismissTimeoutRefs && (U($), window.clearTimeout(this.activeAutoDismissTimeoutRefs[$.timestamp]), delete this.activeAutoDismissTimeoutRefs[$.timestamp]);
              });
            }
            update(x, U, $) {
              var H = Array.isArray($) ? $ : [$];
              if (H.length) {
                var rt = H.map((Nt) => Nt.timestamp);
                switch (x) {
                  case "add":
                    H.forEach((Nt) => this.map[Nt.timestamp] = Nt), this.status.added.ids = st(this.status.added.ids, rt, It.sortTimestampsFn);
                    break;
                  case "pending":
                    this.status.pended.ids = st(this.status.pended.ids, rt, It.sortTimestampsFn), this.status.activated.ids = ht(this.status.activated.ids, rt), this.status.deactivated.ids = ht(this.status.deactivated.ids, rt);
                    break;
                  case "activate":
                    this.status.pended.ids = ht(this.status.pended.ids, rt), this.status.activated.ids = st(this.status.activated.ids, rt, It.sortTimestampsFn), this.status.deactivated.ids = ht(this.status.deactivated.ids, rt);
                    break;
                  case "deactivate":
                    this.status.pended.ids = ht(this.status.pended.ids, rt), this.status.activated.ids = ht(this.status.activated.ids, rt), this.status.deactivated.ids = st(this.status.deactivated.ids, rt, It.sortTimestampsFn);
                    break;
                  case "remove":
                    this.status.pended.ids = ht(this.status.pended.ids, rt), this.status.activated.ids = ht(this.status.activated.ids, rt), this.status.deactivated.ids = ht(this.status.deactivated.ids, rt), this.status.added.ids = ht(this.status.added.ids, rt), this.status.removed.ids = st(this.status.removed.ids, rt, It.sortTimestampsFn), rt.forEach((Nt) => delete this.map[Nt]);
                }
                this.updateNotificationsCollections(), this.emit(x, H, U), this.propagate(x, U, H);
              }
            }
            propagate(x, U, $) {
              var H = Array.isArray($) ? $ : [$];
              if (H.length) switch (x) {
                case "add":
                  this.update("pending", b.PendingEventReason.ServiceAutoPropagate, H);
                  break;
                case "pending":
                case "deactivate":
                  H.forEach((rt) => {
                    this.removeAutoDismiss(rt);
                  }), this.update("activate", b.ActivateEventReason.ServiceAutoPropagate, this.prepareActiveCandidatesNotifications(this.status.pended));
                  break;
                case "activate":
                  H.forEach((rt) => {
                    this.setAutoDismiss(rt, (Nt) => {
                      Nt.mode === b.Mode.AutoDismiss && this.serviceHubAdapter.emit("statusServiceUpdateRequest", Nt, b.Status.Pended, b.PendingEventReason.ServiceAutoDismiss);
                    });
                  });
                  break;
                case "remove":
                  this.update("deactivate", b.DeactivateEventReason.UserNegative, H);
              }
            }
            prepareAddNotifications(x) {
              var U = Object.keys(this.serviceConfig.DISABLED_ITEM_MODE).reduce(($, H) => (this.serviceConfig.DISABLED_ITEM_MODE[H] || $.push(H), $), []).map(($) => '"'.concat($, '"')).join(", ");
              return (Array.isArray(x) ? x : [x]).filter(($) => !this.serviceConfig.DISABLED_ITEM_MODE[$.data.mode] || (Ct.error('Trying to .add(...) notification mode "'.concat($.data.mode, '" that is disabled in this notifications service instance by configuration.Current configuration is: "').concat(JSON.stringify(this.config), '"Only ').concat(U, " allowed. Ignoring .add(").concat(JSON.stringify($), ") notification...")), !1)).map(($) => new J.Item($, this.serviceHubAdapter));
            }
            prepareUpdateNotifications(x) {
              return (Array.isArray(x) ? x : [x]).reduce((U, $) => ($.timestamp in this.map ? U.push($) : Ct.error("Trying to handle untracked notification. Call .add(...) first...", JSON.stringify($)), U), []);
            }
            prepareActiveCandidatesNotifications(x) {
              var U = (Array.isArray(x) ? x : [x]).reduce(($, H) => (this.status.activated[H.mode].length + $[H.mode].length < this.serviceConfig.ACTIVATED_ITEM_MODE_LIMIT[H.mode] && $[H.mode].push(H), $), It.createStatusHolderSubCollections(b.MODES));
              return Object.values(U).reduce(($, H) => $.concat(H), []);
            }
            static sortByTimestampsFn(x, U) {
              return It.sortTimestampsFn(x.timestamp, U.timestamp);
            }
            get added() {
              return this.status.added;
            }
            get pended() {
              return this.status.pended;
            }
            get activated() {
              return this.status.activated;
            }
            get deactivated() {
              return this.status.deactivated;
            }
            getNotificationStatus(x) {
              return Object.keys(this.status).filter((U) => U !== b.Status.Added).find((U) => this.status[U].ids.indexOf(x.timestamp) !== -1);
            }
            get config() {
              return Object.freeze(this.serviceConfig);
            }
            static validateUpdateConfig(x) {
              var U = x;
              if (U.ACTIVATED_ITEM_MODE_LIMIT && U.ACTIVATED_ITEM_MODE_LIMIT.acknowledge > nt.ACTIVATED_ITEM_MODE_LIMIT.acknowledge) throw new Error(`
          Max `.concat(b.Mode.Acknowledge, " limit is ").concat(nt.ACTIVATED_ITEM_MODE_LIMIT.acknowledge, `
        `));
              if (U.DISABLED_ITEM_MODE) {
                if (!Object.keys(U.DISABLED_ITEM_MODE).reduce(($, H) => (U.DISABLED_ITEM_MODE[H] && $++, $), 0)) throw new Error("At least one notifications mode should be allowed in service instance");
                Object.keys(U.ACTIVATED_ITEM_MODE_LIMIT).forEach(($) => {
                  $ in U.DISABLED_ITEM_MODE && U.DISABLED_ITEM_MODE[$] && Ct.warn('Changing configuration limit count for mode "'.concat($, `" won't have any effect, because this mode is disabled in notifications service instance`));
                }), "AUTO_DISMISS_TIMEOUT" in U && U.DISABLED_ITEM_MODE[b.Mode.AutoDismiss] && Ct.warn(`Changing "AUTO_DISMISS_TIMEOUT" configuration option won't have any effect,because "`.concat(b.Mode.AutoDismiss, '" mode is disabled in notifications service instance'));
              }
              return !0;
            }
            updateConfig(x) {
              It.validateUpdateConfig(x) && (this.serviceConfig = It.mergeConfig({}, this.serviceConfig, x), Ct.info("Updated notifications service configuration: ", this.config));
            }
            add(x) {
              var U = this.prepareAddNotifications(x);
              return this.update("add", b.AddEventReason.User, U), U;
            }
            pending(x) {
              var U = this.prepareUpdateNotifications(x);
              return this.serviceHubAdapter.emit("statusServiceUpdateRequest", U, b.Status.Pended, b.PendingEventReason.UserSilent), U;
            }
            deactivate(x, U) {
              var $ = this.prepareUpdateNotifications(x);
              return this.serviceHubAdapter.emit("statusServiceUpdateRequest", $, b.Status.Deactivated, U), $;
            }
            remove(x) {
              var U = this.prepareUpdateNotifications(x);
              return this.serviceHubAdapter.emit("statusServiceUpdateRequest", U, b.Status.Removed, b.RemoveEventReason.User), U;
            }
            pendingAllActivated() {
              return this.pending(this.status.activated);
            }
            pendingAll() {
              return this.pending([...this.status.pended, ...this.status.activated]);
            }
            deactivateAllActivated(x) {
              return this.deactivate(this.status.activated, x);
            }
            deactivateAll(x) {
              return this.deactivate([...this.status.pended, ...this.status.activated], x);
            }
            removeAllDeactivated() {
              return this.remove(this.status.deactivated);
            }
            removeAll() {
              return this.remove(this.status.added);
            }
            addEventListener(x, U) {
              this.emitter.on(x, U);
            }
            removeEventListener(x, U) {
              this.emitter.off(x, U);
            }
            addOnceEventListener(x, U) {
              this.emitter.once(x, U);
            }
            removeAllEventListeners() {
              P()(this.emitter);
            }
            emit(x) {
              for (var U = arguments.length, $ = new Array(U > 1 ? U - 1 : 0), H = 1; H < U; H++) $[H - 1] = arguments[H];
              this.emitter.emit(x, ...$);
            }
            bindServiceHubEvents() {
              this.serviceHubAdapter.addEventListener("statusServiceUpdateRequest", (x, U, $) => {
                var H = Array.isArray(x) ? x : [x], rt = H.reduce((me, he) => (me[he.timestamp] = this.getNotificationStatus(he), me), {}), Nt = H.filter((me) => (rt[me.timestamp] === b.Status.Activated || me.mode !== b.Mode.Silent) && U === b.Status.Pended), Bt = Nt.filter((me) => me.mode !== b.Mode.Silent);
                Bt.length && this.serviceHubAdapter.emit("modeStatusUpdateResponse", Bt.reduce((me, he) => (me[he.timestamp] = he, me), {}), b.Mode.Silent), Nt.length && this.update("pending", $, Nt);
                var Ee = H.filter((me) => {
                  var he = rt[me.timestamp];
                  return (he === b.Status.Pended || he === b.Status.Activated) && U === b.Status.Deactivated;
                });
                Ee.length && this.update("deactivate", $, Ee), H.filter((me) => {
                  var he = rt[me.timestamp];
                  return (he === b.Status.Pended || he === b.Status.Activated || he === b.Status.Deactivated) && U === b.Status.Removed;
                }).length && this.update("remove", $, x);
              }), nt.STATUS_EVENTS.forEach((x) => {
                this.addEventListener(x, (U, $) => {
                  var H = nt.STATUS_EVENT_MAP[x], rt = U.reduce((Nt, Bt) => (Nt[Bt.timestamp] = Bt, Nt), {});
                  this.serviceHubAdapter.emit("statusServiceUpdateResponse", rt, H, $);
                });
              });
            }
          }
          It.sortTimestampsFn = (T, x) => T > x ? 1 : T < x ? -1 : 0, J.Service = It;
        })(u || (u = {})), function(J) {
          class b {
            constructor() {
              this.listeners = [], this.listenersOnce = [], this.listen = (st) => (this.listeners.push(st), { stopListen: () => this.stopListen(st) }), this.listenOnce = (st) => (this.listenersOnce.push(st), { stopListenOnce: () => this.stopListenOnce(st) }), this.stopListen = (st) => {
                var ht = this.listeners.indexOf(st, 0);
                return ht > -1 && (this.listeners.splice(ht, 1), !0);
              }, this.stopListenOnce = (st) => {
                var ht = this.listenersOnce.indexOf(st, 0);
                return ht > -1 && (this.listenersOnce.splice(ht, 1), !0);
              }, this.stopListenAll = () => {
                this.listeners = [], this.listenersOnce = [];
              }, this.send = (st) => {
                this.listeners.forEach((ht) => ht(st)), this.listenersOnce.forEach((ht) => ht(st)), this.listenersOnce = [];
              };
            }
          }
          class nt {
            constructor() {
              this.listeners = [], this.listenersOnce = [], this.listen = (st) => (this.listeners.push(st), { stopListen: () => this.stopListen(st) }), this.listenOnce = (st) => (this.listenersOnce.push(st), { stopListenOnce: () => this.stopListenOnce(st) }), this.stopListen = (st) => {
                var ht = this.listeners.indexOf(st, 0);
                return ht > -1 && (this.listeners.splice(ht, 1), !0);
              }, this.stopListenOnce = (st) => {
                var ht = this.listenersOnce.indexOf(st, 0);
                return ht > -1 && (this.listenersOnce.splice(ht, 1), !0);
              }, this.stopListenAll = () => {
                this.listeners = [], this.listenersOnce = [];
              }, this.send = () => {
                this.listeners.forEach((st) => st()), this.listenersOnce.forEach((st) => st()), this.listenersOnce = [];
              };
            }
          }
          J.create = new class {
            withData() {
              var it = new b();
              return { signal: it, send: it.send, stopListenAll: it.stopListenAll };
            }
            empty() {
              var it = new nt();
              return { signal: it, send: it.send, stopListenAll: it.stopListenAll };
            }
          }();
        }(f || (f = {}));
        var z = null, X = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, lt = 1073741824;
        class ct extends Error {
          constructor() {
            super("The timer is in an undefined state.");
          }
        }
        var Q, Jt = () => {
          if (z !== null) return z;
          var J = new Blob([`(()=>{"use strict";
const e=new Map,t=new Map,r=(e,t)=>
{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);
    return{expected:r+o,remainingDelay:o}},
    o=(e,t,r,i)=>{const s=performance.now();
        s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};
        addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;
        if("interval"===i)
        (t=>{const r=e.get(t);
        if(void 0===r)
        throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));
        clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});
        else{if("timeout"!==i)
        throw new Error('The given type "'.concat(i,'" is not supported'));
        (e=>{const r=t.get(e);if(void 0===r)
        throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));
        clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}
        else{if("set"!==s.method)
        throw new Error('The given method "'.concat(s.method,'" is not supported'));
        {const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;
        if("interval"===d)
        ((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);
        e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);
        else{if("timeout"!==d)
        throw new Error('The given type "'.concat(d,'" is not supported'));
        ((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);
        t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`], { type: "application/javascript; charset=utf-8" }), b = URL.createObjectURL(J);
          return Ct.info("Worker url established", b), z = ((nt) => {
            var it = /* @__PURE__ */ new Map([[0, () => {
            }]]), st = /* @__PURE__ */ new Map([[0, () => {
            }]]), ht = /* @__PURE__ */ new Map(), It = new Worker(nt);
            Ct.info("worker created ", It);
            var T, x = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ (($, H) => (rt) => {
              var Nt = H.get(rt), Bt = Nt === void 0 ? rt.size : Nt < lt ? Nt + 1 : 0;
              if (!rt.has(Bt)) return $(rt, Bt);
              if (rt.size < 536870912) {
                for (; rt.has(Bt); ) Bt = Math.floor(Math.random() * lt);
                return $(rt, Bt);
              }
              if (rt.size > X) throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
              for (; rt.has(Bt); ) Bt = Math.floor(Math.random() * X);
              return $(rt, Bt);
            })((T = x, ($, H) => (T.set($, H), H)), x);
            return It.addEventListener("message", ($) => {
              var H, { data: rt } = $;
              if ((H = rt).method !== void 0 && H.method === "call") {
                var { params: { timerId: Nt, timerType: Bt } } = rt;
                if (Bt === "interval") {
                  var Ee = it.get(Nt);
                  if (typeof Ee == "number") {
                    var me = ht.get(Ee);
                    if (me === void 0 || me.timerId !== Nt || me.timerType !== Bt) throw new ct();
                  } else {
                    if (Ee === void 0) throw new ct();
                    Ee();
                  }
                } else if (Bt === "timeout") {
                  var he = st.get(Nt);
                  if (typeof he == "number") {
                    var Xe = ht.get(he);
                    if (Xe === void 0 || Xe.timerId !== Nt || Xe.timerType !== Bt) throw new ct();
                  } else {
                    if (he === void 0) throw new ct();
                    he(), st.delete(Nt);
                  }
                }
              } else if (((yn) => yn.error === null && typeof yn.id == "number")(rt)) {
                var { id: Yt } = rt, $e = ht.get(Yt);
                if ($e === void 0) throw new ct();
                var { timerId: on, timerType: On } = $e;
                ht.delete(Yt), On === "interval" ? it.delete(on) : st.delete(on);
              } else {
                var { error: { message: vn } } = rt;
                Ct.error(vn);
              }
            }), { clearInterval: ($) => {
              var H = U(ht);
              ht.set(H, { timerId: $, timerType: "interval" }), it.set($, H), It.postMessage({ id: H, method: "clear", params: { timerId: $, timerType: "interval" } });
            }, clearTimeout: ($) => {
              var H = U(ht);
              ht.set(H, { timerId: $, timerType: "timeout" }), st.set($, H), It.postMessage({ id: H, method: "clear", params: { timerId: $, timerType: "timeout" } });
            }, setInterval: ($, H) => {
              var rt = U(it);
              return it.set(rt, () => {
                $(), typeof it.get(rt) == "function" && It.postMessage({ id: null, method: "set", params: { delay: H, now: performance.now(), timerId: rt, timerType: "interval" } });
              }), It.postMessage({ id: null, method: "set", params: { delay: H, now: performance.now(), timerId: rt, timerType: "interval" } }), rt;
            }, setTimeout: ($, H) => {
              var rt = U(st);
              return st.set(rt, $), It.postMessage({ id: null, method: "set", params: { delay: H, now: performance.now(), timerId: rt, timerType: "timeout" } }), rt;
            } };
          })(b), z.setTimeout(() => URL.revokeObjectURL(b), 0), z;
        }, Qt = (J) => Jt().clearInterval(J), we = (J) => Jt().clearTimeout(J), Te = (J, b) => Jt().setInterval(J, b), Fe = (J, b) => Jt().setTimeout(J, b);
        function de(J) {
          if (J instanceof Error) return J;
          var b = "[Unable to stringify the thrown value]";
          try {
            b = JSON.stringify(J);
          } catch {
          }
          return new Error("This value was thrown as is, not through an Error: ".concat(b));
        }
        return function(J) {
          var b = null;
          J.setErrorHandler = function(nt) {
            b ? Ct.error("Error handler already set") : (Ct.info("Setting custom error handler: ".concat(nt)), b = nt);
          }, J.check = function(nt, it, st) {
            return nt || (b ? b(it, st) : Ct.info("Assert failed in ".concat(it, ": ").concat(st))), nt;
          };
        }(Q || (Q = {})), Z;
      })(), d.exports = Ot();
    }, 901(d, M, K) {
      function Pt(o, h) {
        return function() {
          return o.apply(h, arguments);
        };
      }
      const { toString: pt } = Object.prototype, { getPrototypeOf: _t } = Object, { iterator: Kt, toStringTag: Ht } = Symbol, Ot = (Et = /* @__PURE__ */ Object.create(null), (o) => {
        const h = pt.call(o);
        return Et[h] || (Et[h] = h.slice(8, -1).toLowerCase());
      });
      var Et;
      const Z = (o) => (o = o.toLowerCase(), (h) => Ot(h) === o), kt = (o) => (h) => typeof h === o, { isArray: Ut } = Array, Wt = kt("undefined");
      function Xt(o) {
        return o !== null && !Wt(o) && o.constructor !== null && !Wt(o.constructor) && qt(o.constructor.isBuffer) && o.constructor.isBuffer(o);
      }
      const se = Z("ArrayBuffer"), oe = kt("string"), qt = kt("function"), re = kt("number"), Tt = (o) => o !== null && typeof o == "object", At = (o) => {
        if (Ot(o) !== "object") return !1;
        const h = _t(o);
        return !(h !== null && h !== Object.prototype && Object.getPrototypeOf(h) !== null || Ht in o || Kt in o);
      }, te = Z("Date"), ce = Z("File"), Ct = Z("Blob"), mt = Z("FileList"), jt = Z("URLSearchParams"), [A, R, N, C] = ["ReadableStream", "Request", "Response", "Headers"].map(Z);
      function V(o, h, { allOwnKeys: y = !1 } = {}) {
        if (o == null) return;
        let v, _;
        if (typeof o != "object" && (o = [o]), Ut(o)) for (v = 0, _ = o.length; v < _; v++) h.call(null, o[v], v, o);
        else {
          if (Xt(o)) return;
          const B = y ? Object.getOwnPropertyNames(o) : Object.keys(o), F = B.length;
          let tt;
          for (v = 0; v < F; v++) tt = B[v], h.call(null, o[tt], tt, o);
        }
      }
      function m(o, h) {
        if (Xt(o)) return null;
        h = h.toLowerCase();
        const y = Object.keys(o);
        let v, _ = y.length;
        for (; _-- > 0; ) if (v = y[_], h === v.toLowerCase()) return v;
        return null;
      }
      const D = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : K.g, dt = (o) => !Wt(o) && o !== D, yt = (at = typeof Uint8Array < "u" && _t(Uint8Array), (o) => at && o instanceof at);
      var at;
      const j = Z("HTMLFormElement"), E = (({ hasOwnProperty: o }) => (h, y) => o.call(h, y))(Object.prototype), q = Z("RegExp"), Y = (o, h) => {
        const y = Object.getOwnPropertyDescriptors(o), v = {};
        V(y, (_, B) => {
          let F;
          (F = h(_, B, o)) !== !1 && (v[B] = F || _);
        }), Object.defineProperties(o, v);
      }, Oe = Z("AsyncFunction"), be = (Ne = typeof setImmediate == "function", Ve = qt(D.postMessage), Ne ? setImmediate : Ve ? (He = `axios@${Math.random()}`, S = [], D.addEventListener("message", ({ source: o, data: h }) => {
        o === D && h === He && S.length && S.shift()();
      }, !1), (o) => {
        S.push(o), D.postMessage(He, "*");
      }) : (o) => setTimeout(o));
      var Ne, Ve, He, S;
      const r = typeof queueMicrotask < "u" ? queueMicrotask.bind(D) : typeof process < "u" && process.nextTick || be;
      var n = { isArray: Ut, isArrayBuffer: se, isBuffer: Xt, isFormData: (o) => {
        let h;
        return o && (typeof FormData == "function" && o instanceof FormData || qt(o.append) && ((h = Ot(o)) === "formdata" || h === "object" && qt(o.toString) && o.toString() === "[object FormData]"));
      }, isArrayBufferView: function(o) {
        let h;
        return h = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(o) : o && o.buffer && se(o.buffer), h;
      }, isString: oe, isNumber: re, isBoolean: (o) => o === !0 || o === !1, isObject: Tt, isPlainObject: At, isEmptyObject: (o) => {
        if (!Tt(o) || Xt(o)) return !1;
        try {
          return Object.keys(o).length === 0 && Object.getPrototypeOf(o) === Object.prototype;
        } catch {
          return !1;
        }
      }, isReadableStream: A, isRequest: R, isResponse: N, isHeaders: C, isUndefined: Wt, isDate: te, isFile: ce, isBlob: Ct, isRegExp: q, isFunction: qt, isStream: (o) => Tt(o) && qt(o.pipe), isURLSearchParams: jt, isTypedArray: yt, isFileList: mt, forEach: V, merge: function o() {
        const { caseless: h, skipUndefined: y } = dt(this) && this || {}, v = {}, _ = (B, F) => {
          const tt = h && m(v, F) || F;
          At(v[tt]) && At(B) ? v[tt] = o(v[tt], B) : At(B) ? v[tt] = o({}, B) : Ut(B) ? v[tt] = B.slice() : y && Wt(B) || (v[tt] = B);
        };
        for (let B = 0, F = arguments.length; B < F; B++) arguments[B] && V(arguments[B], _);
        return v;
      }, extend: (o, h, y, { allOwnKeys: v } = {}) => (V(h, (_, B) => {
        y && qt(_) ? Object.defineProperty(o, B, { value: Pt(_, y), writable: !0, enumerable: !0, configurable: !0 }) : Object.defineProperty(o, B, { value: _, writable: !0, enumerable: !0, configurable: !0 });
      }, { allOwnKeys: v }), o), trim: (o) => o.trim ? o.trim() : o.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), stripBOM: (o) => (o.charCodeAt(0) === 65279 && (o = o.slice(1)), o), inherits: (o, h, y, v) => {
        o.prototype = Object.create(h.prototype, v), Object.defineProperty(o.prototype, "constructor", { value: o, writable: !0, enumerable: !1, configurable: !0 }), Object.defineProperty(o, "super", { value: h.prototype }), y && Object.assign(o.prototype, y);
      }, toFlatObject: (o, h, y, v) => {
        let _, B, F;
        const tt = {};
        if (h = h || {}, o == null) return h;
        do {
          for (_ = Object.getOwnPropertyNames(o), B = _.length; B-- > 0; ) F = _[B], v && !v(F, o, h) || tt[F] || (h[F] = o[F], tt[F] = !0);
          o = y !== !1 && _t(o);
        } while (o && (!y || y(o, h)) && o !== Object.prototype);
        return h;
      }, kindOf: Ot, kindOfTest: Z, endsWith: (o, h, y) => {
        o = String(o), (y === void 0 || y > o.length) && (y = o.length), y -= h.length;
        const v = o.indexOf(h, y);
        return v !== -1 && v === y;
      }, toArray: (o) => {
        if (!o) return null;
        if (Ut(o)) return o;
        let h = o.length;
        if (!re(h)) return null;
        const y = new Array(h);
        for (; h-- > 0; ) y[h] = o[h];
        return y;
      }, forEachEntry: (o, h) => {
        const y = (o && o[Kt]).call(o);
        let v;
        for (; (v = y.next()) && !v.done; ) {
          const _ = v.value;
          h.call(o, _[0], _[1]);
        }
      }, matchAll: (o, h) => {
        let y;
        const v = [];
        for (; (y = o.exec(h)) !== null; ) v.push(y);
        return v;
      }, isHTMLForm: j, hasOwnProperty: E, hasOwnProp: E, reduceDescriptors: Y, freezeMethods: (o) => {
        Y(o, (h, y) => {
          if (qt(o) && ["arguments", "caller", "callee"].indexOf(y) !== -1) return !1;
          const v = o[y];
          qt(v) && (h.enumerable = !1, "writable" in h ? h.writable = !1 : h.set || (h.set = () => {
            throw Error("Can not rewrite read-only method '" + y + "'");
          }));
        });
      }, toObjectSet: (o, h) => {
        const y = {}, v = (_) => {
          _.forEach((B) => {
            y[B] = !0;
          });
        };
        return Ut(o) ? v(o) : v(String(o).split(h)), y;
      }, toCamelCase: (o) => o.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(h, y, v) {
        return y.toUpperCase() + v;
      }), noop: () => {
      }, toFiniteNumber: (o, h) => o != null && Number.isFinite(o = +o) ? o : h, findKey: m, global: D, isContextDefined: dt, isSpecCompliantForm: function(o) {
        return !!(o && qt(o.append) && o[Ht] === "FormData" && o[Kt]);
      }, toJSONObject: (o) => {
        const h = new Array(10), y = (v, _) => {
          if (Tt(v)) {
            if (h.indexOf(v) >= 0) return;
            if (Xt(v)) return v;
            if (!("toJSON" in v)) {
              h[_] = v;
              const B = Ut(v) ? [] : {};
              return V(v, (F, tt) => {
                const ft = y(F, _ + 1);
                !Wt(ft) && (B[tt] = ft);
              }), h[_] = void 0, B;
            }
          }
          return v;
        };
        return y(o, 0);
      }, isAsyncFn: Oe, isThenable: (o) => o && (Tt(o) || qt(o)) && qt(o.then) && qt(o.catch), setImmediate: be, asap: r, isIterable: (o) => o != null && qt(o[Kt]) };
      class u extends Error {
        static from(h, y, v, _, B, F) {
          const tt = new u(h.message, y || h.code, v, _, B);
          return tt.cause = h, tt.name = h.name, F && Object.assign(tt, F), tt;
        }
        constructor(h, y, v, _, B) {
          super(h), this.name = "AxiosError", this.isAxiosError = !0, y && (this.code = y), v && (this.config = v), _ && (this.request = _), B && (this.response = B, this.status = B.status);
        }
        toJSON() {
          return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: n.toJSONObject(this.config), code: this.code, status: this.status };
        }
      }
      u.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", u.ERR_BAD_OPTION = "ERR_BAD_OPTION", u.ECONNABORTED = "ECONNABORTED", u.ETIMEDOUT = "ETIMEDOUT", u.ERR_NETWORK = "ERR_NETWORK", u.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", u.ERR_DEPRECATED = "ERR_DEPRECATED", u.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", u.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", u.ERR_CANCELED = "ERR_CANCELED", u.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", u.ERR_INVALID_URL = "ERR_INVALID_URL";
      var f = u;
      function k(o) {
        return n.isPlainObject(o) || n.isArray(o);
      }
      function P(o) {
        return n.endsWith(o, "[]") ? o.slice(0, -2) : o;
      }
      function G(o, h, y) {
        return o ? o.concat(h).map(function(v, _) {
          return v = P(v), !y && _ ? "[" + v + "]" : v;
        }).join(y ? "." : "") : h;
      }
      const z = n.toFlatObject(n, {}, null, function(o) {
        return /^is[A-Z]/.test(o);
      });
      function X(o, h, y) {
        if (!n.isObject(o)) throw new TypeError("target must be an object");
        h = h || new FormData();
        const v = (y = n.toFlatObject(y, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function(xt, $t) {
          return !n.isUndefined($t[xt]);
        })).metaTokens, _ = y.visitor || gt, B = y.dots, F = y.indexes, tt = (y.Blob || typeof Blob < "u" && Blob) && n.isSpecCompliantForm(h);
        if (!n.isFunction(_)) throw new TypeError("visitor must be a function");
        function ft(xt) {
          if (xt === null) return "";
          if (n.isDate(xt)) return xt.toISOString();
          if (n.isBoolean(xt)) return xt.toString();
          if (!tt && n.isBlob(xt)) throw new f("Blob is not supported. Use a Buffer instead.");
          return n.isArrayBuffer(xt) || n.isTypedArray(xt) ? tt && typeof Blob == "function" ? new Blob([xt]) : Buffer.from(xt) : xt;
        }
        function gt(xt, $t, Zt) {
          let Vt = xt;
          if (xt && !Zt && typeof xt == "object") {
            if (n.endsWith($t, "{}")) $t = v ? $t : $t.slice(0, -2), xt = JSON.stringify(xt);
            else if (n.isArray(xt) && function(ue) {
              return n.isArray(ue) && !ue.some(k);
            }(xt) || (n.isFileList(xt) || n.endsWith($t, "[]")) && (Vt = n.toArray(xt))) return $t = P($t), Vt.forEach(function(ue, Be) {
              !n.isUndefined(ue) && ue !== null && h.append(F === !0 ? G([$t], Be, B) : F === null ? $t : $t + "[]", ft(ue));
            }), !1;
          }
          return !!k(xt) || (h.append(G(Zt, $t, B), ft(xt)), !1);
        }
        const bt = [], Ft = Object.assign(z, { defaultVisitor: gt, convertValue: ft, isVisitable: k });
        if (!n.isObject(o)) throw new TypeError("data must be an object");
        return function xt($t, Zt) {
          if (!n.isUndefined($t)) {
            if (bt.indexOf($t) !== -1) throw Error("Circular reference detected in " + Zt.join("."));
            bt.push($t), n.forEach($t, function(Vt, ue) {
              (!(n.isUndefined(Vt) || Vt === null) && _.call(h, Vt, n.isString(ue) ? ue.trim() : ue, Zt, Ft)) === !0 && xt(Vt, Zt ? Zt.concat(ue) : [ue]);
            }), bt.pop();
          }
        }(o), h;
      }
      function lt(o) {
        const h = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
        return encodeURIComponent(o).replace(/[!'()~]|%20|%00/g, function(y) {
          return h[y];
        });
      }
      function ct(o, h) {
        this._pairs = [], o && X(o, this, h);
      }
      const Q = ct.prototype;
      function Jt(o) {
        return encodeURIComponent(o).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
      }
      function Qt(o, h, y) {
        if (!h) return o;
        const v = y && y.encode || Jt, _ = n.isFunction(y) ? { serialize: y } : y, B = _ && _.serialize;
        let F;
        if (F = B ? B(h, _) : n.isURLSearchParams(h) ? h.toString() : new ct(h, _).toString(v), F) {
          const tt = o.indexOf("#");
          tt !== -1 && (o = o.slice(0, tt)), o += (o.indexOf("?") === -1 ? "?" : "&") + F;
        }
        return o;
      }
      Q.append = function(o, h) {
        this._pairs.push([o, h]);
      }, Q.toString = function(o) {
        const h = o ? function(y) {
          return o.call(this, y, lt);
        } : lt;
        return this._pairs.map(function(y) {
          return h(y[0]) + "=" + h(y[1]);
        }, "").join("&");
      };
      var we = class {
        constructor() {
          this.handlers = [];
        }
        use(o, h, y) {
          return this.handlers.push({ fulfilled: o, rejected: h, synchronous: !!y && y.synchronous, runWhen: y ? y.runWhen : null }), this.handlers.length - 1;
        }
        eject(o) {
          this.handlers[o] && (this.handlers[o] = null);
        }
        clear() {
          this.handlers && (this.handlers = []);
        }
        forEach(o) {
          n.forEach(this.handlers, function(h) {
            h !== null && o(h);
          });
        }
      }, Te = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 }, Fe = { isBrowser: !0, classes: { URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : ct, FormData: typeof FormData < "u" ? FormData : null, Blob: typeof Blob < "u" ? Blob : null }, protocols: ["http", "https", "file", "blob", "url", "data"] };
      const de = typeof window < "u" && typeof document < "u", J = typeof navigator == "object" && navigator || void 0, b = de && (!J || ["ReactNative", "NativeScript", "NS"].indexOf(J.product) < 0), nt = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", it = de && window.location.href || "http://localhost";
      var st = { ...Object.freeze({ __proto__: null, hasBrowserEnv: de, hasStandardBrowserWebWorkerEnv: nt, hasStandardBrowserEnv: b, navigator: J, origin: it }), ...Fe };
      function ht(o) {
        function h(y, v, _, B) {
          let F = y[B++];
          if (F === "__proto__") return !0;
          const tt = Number.isFinite(+F), ft = B >= y.length;
          return F = !F && n.isArray(_) ? _.length : F, ft ? (n.hasOwnProp(_, F) ? _[F] = [_[F], v] : _[F] = v, !tt) : (_[F] && n.isObject(_[F]) || (_[F] = []), h(y, v, _[F], B) && n.isArray(_[F]) && (_[F] = function(gt) {
            const bt = {}, Ft = Object.keys(gt);
            let xt;
            const $t = Ft.length;
            let Zt;
            for (xt = 0; xt < $t; xt++) Zt = Ft[xt], bt[Zt] = gt[Zt];
            return bt;
          }(_[F])), !tt);
        }
        if (n.isFormData(o) && n.isFunction(o.entries)) {
          const y = {};
          return n.forEachEntry(o, (v, _) => {
            h(function(B) {
              return n.matchAll(/\w+|\[(\w*)]/g, B).map((F) => F[0] === "[]" ? "" : F[1] || F[0]);
            }(v), _, y, 0);
          }), y;
        }
        return null;
      }
      const It = { transitional: Te, adapter: ["xhr", "http", "fetch"], transformRequest: [function(o, h) {
        const y = h.getContentType() || "", v = y.indexOf("application/json") > -1, _ = n.isObject(o);
        if (_ && n.isHTMLForm(o) && (o = new FormData(o)), n.isFormData(o)) return v ? JSON.stringify(ht(o)) : o;
        if (n.isArrayBuffer(o) || n.isBuffer(o) || n.isStream(o) || n.isFile(o) || n.isBlob(o) || n.isReadableStream(o)) return o;
        if (n.isArrayBufferView(o)) return o.buffer;
        if (n.isURLSearchParams(o)) return h.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), o.toString();
        let B;
        if (_) {
          if (y.indexOf("application/x-www-form-urlencoded") > -1) return function(F, tt) {
            return X(F, new st.classes.URLSearchParams(), { visitor: function(ft, gt, bt, Ft) {
              return st.isNode && n.isBuffer(ft) ? (this.append(gt, ft.toString("base64")), !1) : Ft.defaultVisitor.apply(this, arguments);
            }, ...tt });
          }(o, this.formSerializer).toString();
          if ((B = n.isFileList(o)) || y.indexOf("multipart/form-data") > -1) {
            const F = this.env && this.env.FormData;
            return X(B ? { "files[]": o } : o, F && new F(), this.formSerializer);
          }
        }
        return _ || v ? (h.setContentType("application/json", !1), function(F) {
          if (n.isString(F)) try {
            return (0, JSON.parse)(F), n.trim(F);
          } catch (tt) {
            if (tt.name !== "SyntaxError") throw tt;
          }
          return (0, JSON.stringify)(F);
        }(o)) : o;
      }], transformResponse: [function(o) {
        const h = this.transitional || It.transitional, y = h && h.forcedJSONParsing, v = this.responseType === "json";
        if (n.isResponse(o) || n.isReadableStream(o)) return o;
        if (o && n.isString(o) && (y && !this.responseType || v)) {
          const _ = !(h && h.silentJSONParsing) && v;
          try {
            return JSON.parse(o, this.parseReviver);
          } catch (B) {
            if (_)
              throw B.name === "SyntaxError" ? f.from(B, f.ERR_BAD_RESPONSE, this, null, this.response) : B;
          }
        }
        return o;
      }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: st.classes.FormData, Blob: st.classes.Blob }, validateStatus: function(o) {
        return o >= 200 && o < 300;
      }, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
      n.forEach(["delete", "get", "head", "post", "put", "patch"], (o) => {
        It.headers[o] = {};
      });
      var T = It;
      const x = n.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), U = Symbol("internals");
      function $(o) {
        return o && String(o).trim().toLowerCase();
      }
      function H(o) {
        return o === !1 || o == null ? o : n.isArray(o) ? o.map(H) : String(o);
      }
      function rt(o, h, y, v, _) {
        return n.isFunction(v) ? v.call(this, h, y) : (_ && (h = y), n.isString(h) ? n.isString(v) ? h.indexOf(v) !== -1 : n.isRegExp(v) ? v.test(h) : void 0 : void 0);
      }
      class Nt {
        constructor(h) {
          h && this.set(h);
        }
        set(h, y, v) {
          const _ = this;
          function B(tt, ft, gt) {
            const bt = $(ft);
            if (!bt) throw new Error("header name must be a non-empty string");
            const Ft = n.findKey(_, bt);
            (!Ft || _[Ft] === void 0 || gt === !0 || gt === void 0 && _[Ft] !== !1) && (_[Ft || ft] = H(tt));
          }
          const F = (tt, ft) => n.forEach(tt, (gt, bt) => B(gt, bt, ft));
          if (n.isPlainObject(h) || h instanceof this.constructor) F(h, y);
          else if (n.isString(h) && (h = h.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(h.trim())) F(((tt) => {
            const ft = {};
            let gt, bt, Ft;
            return tt && tt.split(`
`).forEach(function(xt) {
              Ft = xt.indexOf(":"), gt = xt.substring(0, Ft).trim().toLowerCase(), bt = xt.substring(Ft + 1).trim(), !gt || ft[gt] && x[gt] || (gt === "set-cookie" ? ft[gt] ? ft[gt].push(bt) : ft[gt] = [bt] : ft[gt] = ft[gt] ? ft[gt] + ", " + bt : bt);
            }), ft;
          })(h), y);
          else if (n.isObject(h) && n.isIterable(h)) {
            let tt, ft, gt = {};
            for (const bt of h) {
              if (!n.isArray(bt)) throw TypeError("Object iterator must return a key-value pair");
              gt[ft = bt[0]] = (tt = gt[ft]) ? n.isArray(tt) ? [...tt, bt[1]] : [tt, bt[1]] : bt[1];
            }
            F(gt, y);
          } else h != null && B(y, h, v);
          return this;
        }
        get(h, y) {
          if (h = $(h)) {
            const v = n.findKey(this, h);
            if (v) {
              const _ = this[v];
              if (!y) return _;
              if (y === !0) return function(B) {
                const F = /* @__PURE__ */ Object.create(null), tt = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                let ft;
                for (; ft = tt.exec(B); ) F[ft[1]] = ft[2];
                return F;
              }(_);
              if (n.isFunction(y)) return y.call(this, _, v);
              if (n.isRegExp(y)) return y.exec(_);
              throw new TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(h, y) {
          if (h = $(h)) {
            const v = n.findKey(this, h);
            return !(!v || this[v] === void 0 || y && !rt(0, this[v], v, y));
          }
          return !1;
        }
        delete(h, y) {
          const v = this;
          let _ = !1;
          function B(F) {
            if (F = $(F)) {
              const tt = n.findKey(v, F);
              !tt || y && !rt(0, v[tt], tt, y) || (delete v[tt], _ = !0);
            }
          }
          return n.isArray(h) ? h.forEach(B) : B(h), _;
        }
        clear(h) {
          const y = Object.keys(this);
          let v = y.length, _ = !1;
          for (; v--; ) {
            const B = y[v];
            h && !rt(0, this[B], B, h, !0) || (delete this[B], _ = !0);
          }
          return _;
        }
        normalize(h) {
          const y = this, v = {};
          return n.forEach(this, (_, B) => {
            const F = n.findKey(v, B);
            if (F) return y[F] = H(_), void delete y[B];
            const tt = h ? function(ft) {
              return ft.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (gt, bt, Ft) => bt.toUpperCase() + Ft);
            }(B) : String(B).trim();
            tt !== B && delete y[B], y[tt] = H(_), v[tt] = !0;
          }), this;
        }
        concat(...h) {
          return this.constructor.concat(this, ...h);
        }
        toJSON(h) {
          const y = /* @__PURE__ */ Object.create(null);
          return n.forEach(this, (v, _) => {
            v != null && v !== !1 && (y[_] = h && n.isArray(v) ? v.join(", ") : v);
          }), y;
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON()).map(([h, y]) => h + ": " + y).join(`
`);
        }
        getSetCookie() {
          return this.get("set-cookie") || [];
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(h) {
          return h instanceof this ? h : new this(h);
        }
        static concat(h, ...y) {
          const v = new this(h);
          return y.forEach((_) => v.set(_)), v;
        }
        static accessor(h) {
          const y = (this[U] = this[U] = { accessors: {} }).accessors, v = this.prototype;
          function _(B) {
            const F = $(B);
            y[F] || (function(tt, ft) {
              const gt = n.toCamelCase(" " + ft);
              ["get", "set", "has"].forEach((bt) => {
                Object.defineProperty(tt, bt + gt, { value: function(Ft, xt, $t) {
                  return this[bt].call(this, ft, Ft, xt, $t);
                }, configurable: !0 });
              });
            }(v, B), y[F] = !0);
          }
          return n.isArray(h) ? h.forEach(_) : _(h), this;
        }
      }
      Nt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), n.reduceDescriptors(Nt.prototype, ({ value: o }, h) => {
        let y = h[0].toUpperCase() + h.slice(1);
        return { get: () => o, set(v) {
          this[y] = v;
        } };
      }), n.freezeMethods(Nt);
      var Bt = Nt;
      function Ee(o, h) {
        const y = this || T, v = h || y, _ = Bt.from(v.headers);
        let B = v.data;
        return n.forEach(o, function(F) {
          B = F.call(y, B, _.normalize(), h ? h.status : void 0);
        }), _.normalize(), B;
      }
      function me(o) {
        return !(!o || !o.__CANCEL__);
      }
      var he = class extends f {
        constructor(o, h, y) {
          super(o ?? "canceled", f.ERR_CANCELED, h, y), this.name = "CanceledError", this.__CANCEL__ = !0;
        }
      };
      function Xe(o, h, y) {
        const v = y.config.validateStatus;
        y.status && v && !v(y.status) ? h(new f("Request failed with status code " + y.status, [f.ERR_BAD_REQUEST, f.ERR_BAD_RESPONSE][Math.floor(y.status / 100) - 4], y.config, y.request, y)) : o(y);
      }
      const Yt = (o, h, y = 3) => {
        let v = 0;
        const _ = function(B, F) {
          B = B || 10;
          const tt = new Array(B), ft = new Array(B);
          let gt, bt = 0, Ft = 0;
          return F = F !== void 0 ? F : 1e3, function(xt) {
            const $t = Date.now(), Zt = ft[Ft];
            gt || (gt = $t), tt[bt] = xt, ft[bt] = $t;
            let Vt = Ft, ue = 0;
            for (; Vt !== bt; ) ue += tt[Vt++], Vt %= B;
            if (bt = (bt + 1) % B, bt === Ft && (Ft = (Ft + 1) % B), $t - gt < F) return;
            const Be = Zt && $t - Zt;
            return Be ? Math.round(1e3 * ue / Be) : void 0;
          };
        }(50, 250);
        return function(B, F) {
          let tt, ft, gt = 0, bt = 1e3 / F;
          const Ft = (xt, $t = Date.now()) => {
            gt = $t, tt = null, ft && (clearTimeout(ft), ft = null), ((Zt) => {
              const Vt = Zt.loaded, ue = Zt.lengthComputable ? Zt.total : void 0, Be = Vt - v, ye = _(Be);
              v = Vt, o({ loaded: Vt, total: ue, progress: ue ? Vt / ue : void 0, bytes: Be, rate: ye || void 0, estimated: ye && ue && Vt <= ue ? (ue - Vt) / ye : void 0, event: Zt, lengthComputable: ue != null, [h ? "download" : "upload"]: !0 });
            })(...xt);
          };
          return [(...xt) => {
            const $t = Date.now(), Zt = $t - gt;
            Zt >= bt ? Ft(xt, $t) : (tt = xt, ft || (ft = setTimeout(() => {
              ft = null, Ft(tt);
            }, bt - Zt)));
          }, () => tt && Ft(tt)];
        }(0, y);
      }, $e = (o, h) => {
        const y = o != null;
        return [(v) => h[0]({ lengthComputable: y, total: o, loaded: v }), h[1]];
      }, on = (o) => (...h) => n.asap(() => o(...h));
      var On = st.hasStandardBrowserEnv ? /* @__PURE__ */ ((o, h) => (y) => (y = new URL(y, st.origin), o.protocol === y.protocol && o.host === y.host && (h || o.port === y.port)))(new URL(st.origin), st.navigator && /(msie|trident)/i.test(st.navigator.userAgent)) : () => !0, vn = st.hasStandardBrowserEnv ? { write(o, h, y, v, _, B, F) {
        if (typeof document > "u") return;
        const tt = [`${o}=${encodeURIComponent(h)}`];
        n.isNumber(y) && tt.push(`expires=${new Date(y).toUTCString()}`), n.isString(v) && tt.push(`path=${v}`), n.isString(_) && tt.push(`domain=${_}`), B === !0 && tt.push("secure"), n.isString(F) && tt.push(`SameSite=${F}`), document.cookie = tt.join("; ");
      }, read(o) {
        if (typeof document > "u") return null;
        const h = document.cookie.match(new RegExp("(?:^|; )" + o + "=([^;]*)"));
        return h ? decodeURIComponent(h[1]) : null;
      }, remove(o) {
        this.write(o, "", Date.now() - 864e5, "/");
      } } : { write() {
      }, read: () => null, remove() {
      } };
      function yn(o, h, y) {
        let v = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(h);
        return o && (v || y == 0) ? function(_, B) {
          return B ? _.replace(/\/?\/$/, "") + "/" + B.replace(/^\/+/, "") : _;
        }(o, h) : h;
      }
      const hn = (o) => o instanceof Bt ? { ...o } : o;
      function Qe(o, h) {
        h = h || {};
        const y = {};
        function v(gt, bt, Ft, xt) {
          return n.isPlainObject(gt) && n.isPlainObject(bt) ? n.merge.call({ caseless: xt }, gt, bt) : n.isPlainObject(bt) ? n.merge({}, bt) : n.isArray(bt) ? bt.slice() : bt;
        }
        function _(gt, bt, Ft, xt) {
          return n.isUndefined(bt) ? n.isUndefined(gt) ? void 0 : v(void 0, gt, 0, xt) : v(gt, bt, 0, xt);
        }
        function B(gt, bt) {
          if (!n.isUndefined(bt)) return v(void 0, bt);
        }
        function F(gt, bt) {
          return n.isUndefined(bt) ? n.isUndefined(gt) ? void 0 : v(void 0, gt) : v(void 0, bt);
        }
        function tt(gt, bt, Ft) {
          return Ft in h ? v(gt, bt) : Ft in o ? v(void 0, gt) : void 0;
        }
        const ft = { url: B, method: B, data: B, baseURL: F, transformRequest: F, transformResponse: F, paramsSerializer: F, timeout: F, timeoutMessage: F, withCredentials: F, withXSRFToken: F, adapter: F, responseType: F, xsrfCookieName: F, xsrfHeaderName: F, onUploadProgress: F, onDownloadProgress: F, decompress: F, maxContentLength: F, maxBodyLength: F, beforeRedirect: F, transport: F, httpAgent: F, httpsAgent: F, cancelToken: F, socketPath: F, responseEncoding: F, validateStatus: tt, headers: (gt, bt, Ft) => _(hn(gt), hn(bt), 0, !0) };
        return n.forEach(Object.keys({ ...o, ...h }), function(gt) {
          const bt = ft[gt] || _, Ft = bt(o[gt], h[gt], gt);
          n.isUndefined(Ft) && bt !== tt || (y[gt] = Ft);
        }), y;
      }
      var Ke = (o) => {
        const h = Qe({}, o);
        let { data: y, withXSRFToken: v, xsrfHeaderName: _, xsrfCookieName: B, headers: F, auth: tt } = h;
        if (h.headers = F = Bt.from(F), h.url = Qt(yn(h.baseURL, h.url, h.allowAbsoluteUrls), o.params, o.paramsSerializer), tt && F.set("Authorization", "Basic " + btoa((tt.username || "") + ":" + (tt.password ? unescape(encodeURIComponent(tt.password)) : ""))), n.isFormData(y)) {
          if (st.hasStandardBrowserEnv || st.hasStandardBrowserWebWorkerEnv) F.setContentType(void 0);
          else if (n.isFunction(y.getHeaders)) {
            const ft = y.getHeaders(), gt = ["content-type", "content-length"];
            Object.entries(ft).forEach(([bt, Ft]) => {
              gt.includes(bt.toLowerCase()) && F.set(bt, Ft);
            });
          }
        }
        if (st.hasStandardBrowserEnv && (v && n.isFunction(v) && (v = v(h)), v || v !== !1 && On(h.url))) {
          const ft = _ && B && vn.read(B);
          ft && F.set(_, ft);
        }
        return h;
      }, Re = typeof XMLHttpRequest < "u" && function(o) {
        return new Promise(function(h, y) {
          const v = Ke(o);
          let _ = v.data;
          const B = Bt.from(v.headers).normalize();
          let F, tt, ft, gt, bt, { responseType: Ft, onUploadProgress: xt, onDownloadProgress: $t } = v;
          function Zt() {
            gt && gt(), bt && bt(), v.cancelToken && v.cancelToken.unsubscribe(F), v.signal && v.signal.removeEventListener("abort", F);
          }
          let Vt = new XMLHttpRequest();
          function ue() {
            if (!Vt) return;
            const ye = Bt.from("getAllResponseHeaders" in Vt && Vt.getAllResponseHeaders());
            Xe(function(ze) {
              h(ze), Zt();
            }, function(ze) {
              y(ze), Zt();
            }, { data: Ft && Ft !== "text" && Ft !== "json" ? Vt.response : Vt.responseText, status: Vt.status, statusText: Vt.statusText, headers: ye, config: o, request: Vt }), Vt = null;
          }
          Vt.open(v.method.toUpperCase(), v.url, !0), Vt.timeout = v.timeout, "onloadend" in Vt ? Vt.onloadend = ue : Vt.onreadystatechange = function() {
            Vt && Vt.readyState === 4 && (Vt.status !== 0 || Vt.responseURL && Vt.responseURL.indexOf("file:") === 0) && setTimeout(ue);
          }, Vt.onabort = function() {
            Vt && (y(new f("Request aborted", f.ECONNABORTED, o, Vt)), Vt = null);
          }, Vt.onerror = function(ye) {
            const ze = ye && ye.message ? ye.message : "Network Error", un = new f(ze, f.ERR_NETWORK, o, Vt);
            un.event = ye || null, y(un), Vt = null;
          }, Vt.ontimeout = function() {
            let ye = v.timeout ? "timeout of " + v.timeout + "ms exceeded" : "timeout exceeded";
            const ze = v.transitional || Te;
            v.timeoutErrorMessage && (ye = v.timeoutErrorMessage), y(new f(ye, ze.clarifyTimeoutError ? f.ETIMEDOUT : f.ECONNABORTED, o, Vt)), Vt = null;
          }, _ === void 0 && B.setContentType(null), "setRequestHeader" in Vt && n.forEach(B.toJSON(), function(ye, ze) {
            Vt.setRequestHeader(ze, ye);
          }), n.isUndefined(v.withCredentials) || (Vt.withCredentials = !!v.withCredentials), Ft && Ft !== "json" && (Vt.responseType = v.responseType), $t && ([ft, bt] = Yt($t, !0), Vt.addEventListener("progress", ft)), xt && Vt.upload && ([tt, gt] = Yt(xt), Vt.upload.addEventListener("progress", tt), Vt.upload.addEventListener("loadend", gt)), (v.cancelToken || v.signal) && (F = (ye) => {
            Vt && (y(!ye || ye.type ? new he(null, o, Vt) : ye), Vt.abort(), Vt = null);
          }, v.cancelToken && v.cancelToken.subscribe(F), v.signal && (v.signal.aborted ? F() : v.signal.addEventListener("abort", F)));
          const Be = function(ye) {
            const ze = /^([-+\w]{1,25})(:?\/\/|:)/.exec(ye);
            return ze && ze[1] || "";
          }(v.url);
          Be && st.protocols.indexOf(Be) === -1 ? y(new f("Unsupported protocol " + Be + ":", f.ERR_BAD_REQUEST, o)) : Vt.send(_ || null);
        });
      }, an = (o, h) => {
        const { length: y } = o = o ? o.filter(Boolean) : [];
        if (h || y) {
          let v, _ = new AbortController();
          const B = function(gt) {
            if (!v) {
              v = !0, tt();
              const bt = gt instanceof Error ? gt : this.reason;
              _.abort(bt instanceof f ? bt : new he(bt instanceof Error ? bt.message : bt));
            }
          };
          let F = h && setTimeout(() => {
            F = null, B(new f(`timeout of ${h}ms exceeded`, f.ETIMEDOUT));
          }, h);
          const tt = () => {
            o && (F && clearTimeout(F), F = null, o.forEach((gt) => {
              gt.unsubscribe ? gt.unsubscribe(B) : gt.removeEventListener("abort", B);
            }), o = null);
          };
          o.forEach((gt) => gt.addEventListener("abort", B));
          const { signal: ft } = _;
          return ft.unsubscribe = () => n.asap(tt), ft;
        }
      };
      const ln = function* (o, h) {
        let y = o.byteLength;
        if (y < h) return void (yield o);
        let v, _ = 0;
        for (; _ < y; ) v = _ + h, yield o.slice(_, v), _ = v;
      }, Tn = (o, h, y, v) => {
        const _ = async function* (ft, gt) {
          for await (const bt of async function* (Ft) {
            if (Ft[Symbol.asyncIterator]) return void (yield* Ft);
            const xt = Ft.getReader();
            try {
              for (; ; ) {
                const { done: $t, value: Zt } = await xt.read();
                if ($t) break;
                yield Zt;
              }
            } finally {
              await xt.cancel();
            }
          }(ft)) yield* ln(bt, gt);
        }(o, h);
        let B, F = 0, tt = (ft) => {
          B || (B = !0, v && v(ft));
        };
        return new ReadableStream({ async pull(ft) {
          try {
            const { done: gt, value: bt } = await _.next();
            if (gt) return tt(), void ft.close();
            let Ft = bt.byteLength;
            if (y) {
              let xt = F += Ft;
              y(xt);
            }
            ft.enqueue(new Uint8Array(bt));
          } catch (gt) {
            throw tt(gt), gt;
          }
        }, cancel: (ft) => (tt(ft), _.return()) }, { highWaterMark: 2 });
      }, { isFunction: fn } = n, bn = (({ Request: o, Response: h }) => ({ Request: o, Response: h }))(n.global), { ReadableStream: p, TextEncoder: e } = n.global, s = (o, ...h) => {
        try {
          return !!o(...h);
        } catch {
          return !1;
        }
      }, w = (o) => {
        o = n.merge.call({ skipUndefined: !0 }, bn, o);
        const { fetch: h, Request: y, Response: v } = o, _ = h ? fn(h) : typeof fetch == "function", B = fn(y), F = fn(v);
        if (!_) return !1;
        const tt = _ && fn(p), ft = _ && (typeof e == "function" ? (gt = new e(), ($t) => gt.encode($t)) : async ($t) => new Uint8Array(await new y($t).arrayBuffer()));
        var gt;
        const bt = B && tt && s(() => {
          let $t = !1;
          const Zt = new y(st.origin, { body: new p(), method: "POST", get duplex() {
            return $t = !0, "half";
          } }).headers.has("Content-Type");
          return $t && !Zt;
        }), Ft = F && tt && s(() => n.isReadableStream(new v("").body)), xt = { stream: Ft && (($t) => $t.body) };
        return _ && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(($t) => {
          !xt[$t] && (xt[$t] = (Zt, Vt) => {
            let ue = Zt && Zt[$t];
            if (ue) return ue.call(Zt);
            throw new f(`Response type '${$t}' is not supported`, f.ERR_NOT_SUPPORT, Vt);
          });
        }), async ($t) => {
          let { url: Zt, method: Vt, data: ue, signal: Be, cancelToken: ye, timeout: ze, onDownloadProgress: un, onUploadProgress: Kn, responseType: En, headers: zn, withCredentials: jn = "same-origin", fetchOptions: qn } = Ke($t), Yn = h || fetch;
          En = En ? (En + "").toLowerCase() : "text";
          let Fn = an([Be, ye && ye.toAbortSignal()], ze), Un = null;
          const In = Fn && Fn.unsubscribe && (() => {
            Fn.unsubscribe();
          });
          let Xn;
          try {
            if (Kn && bt && Vt !== "get" && Vt !== "head" && (Xn = await (async (gn, dn) => {
              const Rn = n.toFiniteNumber(gn.getContentLength());
              return Rn ?? (async (Je) => Je == null ? 0 : n.isBlob(Je) ? Je.size : n.isSpecCompliantForm(Je) ? (await new y(st.origin, { method: "POST", body: Je }).arrayBuffer()).byteLength : n.isArrayBufferView(Je) || n.isArrayBuffer(Je) ? Je.byteLength : (n.isURLSearchParams(Je) && (Je += ""), n.isString(Je) ? (await ft(Je)).byteLength : void 0))(dn);
            })(zn, ue)) !== 0) {
              let gn, dn = new y(Zt, { method: "POST", body: ue, duplex: "half" });
              if (n.isFormData(ue) && (gn = dn.headers.get("content-type")) && zn.setContentType(gn), dn.body) {
                const [Rn, Je] = $e(Xn, Yt(on(Kn)));
                ue = Tn(dn.body, 65536, Rn, Je);
              }
            }
            n.isString(jn) || (jn = jn ? "include" : "omit");
            const nn = B && "credentials" in y.prototype, Qn = { ...qn, signal: Fn, method: Vt.toUpperCase(), headers: zn.normalize().toJSON(), body: ue, duplex: "half", credentials: nn ? jn : void 0 };
            Un = B && new y(Zt, Qn);
            let wn = await (B ? Yn(Un, qn) : Yn(Zt, Qn));
            const ti = Ft && (En === "stream" || En === "response");
            if (Ft && (un || ti && In)) {
              const gn = {};
              ["status", "statusText", "headers"].forEach((Hn) => {
                gn[Hn] = wn[Hn];
              });
              const dn = n.toFiniteNumber(wn.headers.get("content-length")), [Rn, Je] = un && $e(dn, Yt(on(un), !0)) || [];
              wn = new v(Tn(wn.body, 65536, Rn, () => {
                Je && Je(), In && In();
              }), gn);
            }
            En = En || "text";
            let ai = await xt[n.findKey(xt, En) || "text"](wn, $t);
            return !ti && In && In(), await new Promise((gn, dn) => {
              Xe(gn, dn, { data: ai, headers: Bt.from(wn.headers), status: wn.status, statusText: wn.statusText, config: $t, request: Un });
            });
          } catch (nn) {
            throw In && In(), nn && nn.name === "TypeError" && /Load failed|fetch/i.test(nn.message) ? Object.assign(new f("Network Error", f.ERR_NETWORK, $t, Un), { cause: nn.cause || nn }) : f.from(nn, nn && nn.code, $t, Un);
          }
        };
      }, c = /* @__PURE__ */ new Map(), I = (o) => {
        let h = o && o.env || {};
        const { fetch: y, Request: v, Response: _ } = h, B = [v, _, y];
        let F, tt, ft = B.length, gt = c;
        for (; ft--; ) F = B[ft], tt = gt.get(F), tt === void 0 && gt.set(F, tt = ft ? /* @__PURE__ */ new Map() : w(h)), gt = tt;
        return tt;
      };
      I();
      const wt = { http: null, xhr: Re, fetch: { get: I } };
      n.forEach(wt, (o, h) => {
        if (o) {
          try {
            Object.defineProperty(o, "name", { value: h });
          } catch {
          }
          Object.defineProperty(o, "adapterName", { value: h });
        }
      });
      const St = (o) => `- ${o}`, Lt = (o) => n.isFunction(o) || o === null || o === !1;
      var ut = function(o, h) {
        o = n.isArray(o) ? o : [o];
        const { length: y } = o;
        let v, _;
        const B = {};
        for (let F = 0; F < y; F++) {
          let tt;
          if (v = o[F], _ = v, !Lt(v) && (_ = wt[(tt = String(v)).toLowerCase()], _ === void 0)) throw new f(`Unknown adapter '${tt}'`);
          if (_ && (n.isFunction(_) || (_ = _.get(h)))) break;
          B[tt || "#" + F] = _;
        }
        if (!_) {
          const F = Object.entries(B).map(([ft, gt]) => `adapter ${ft} ` + (gt === !1 ? "is not supported by the environment" : "is not available in the build"));
          let tt = y ? F.length > 1 ? `since :
` + F.map(St).join(`
`) : " " + St(F[0]) : "as no adapter specified";
          throw new f("There is no suitable adapter to dispatch the request " + tt, "ERR_NOT_SUPPORT");
        }
        return _;
      };
      function ot(o) {
        if (o.cancelToken && o.cancelToken.throwIfRequested(), o.signal && o.signal.aborted) throw new he(null, o);
      }
      function ne(o) {
        return ot(o), o.headers = Bt.from(o.headers), o.data = Ee.call(o, o.transformRequest), ["post", "put", "patch"].indexOf(o.method) !== -1 && o.headers.setContentType("application/x-www-form-urlencoded", !1), ut(o.adapter || T.adapter, o)(o).then(function(h) {
          return ot(o), h.data = Ee.call(o, o.transformResponse, h), h.headers = Bt.from(h.headers), h;
        }, function(h) {
          return me(h) || (ot(o), h && h.response && (h.response.data = Ee.call(o, o.transformResponse, h.response), h.response.headers = Bt.from(h.response.headers))), Promise.reject(h);
        });
      }
      const pe = "1.13.4", ve = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((o, h) => {
        ve[o] = function(y) {
          return typeof y === o || "a" + (h < 1 ? "n " : " ") + o;
        };
      });
      const xe = {};
      ve.transitional = function(o, h, y) {
        function v(_, B) {
          return "[Axios v" + pe + "] Transitional option '" + _ + "'" + B + (y ? ". " + y : "");
        }
        return (_, B, F) => {
          if (o === !1) throw new f(v(B, " has been removed" + (h ? " in " + h : "")), f.ERR_DEPRECATED);
          return h && !xe[B] && (xe[B] = !0, console.warn(v(B, " has been deprecated since v" + h + " and will be removed in the near future"))), !o || o(_, B, F);
        };
      }, ve.spelling = function(o) {
        return (h, y) => (console.warn(`${y} is likely a misspelling of ${o}`), !0);
      };
      var Ye = { assertOptions: function(o, h, y) {
        if (typeof o != "object") throw new f("options must be an object", f.ERR_BAD_OPTION_VALUE);
        const v = Object.keys(o);
        let _ = v.length;
        for (; _-- > 0; ) {
          const B = v[_], F = h[B];
          if (F) {
            const tt = o[B], ft = tt === void 0 || F(tt, B, o);
            if (ft !== !0) throw new f("option " + B + " must be " + ft, f.ERR_BAD_OPTION_VALUE);
            continue;
          }
          if (y !== !0) throw new f("Unknown option " + B, f.ERR_BAD_OPTION);
        }
      }, validators: ve };
      const We = Ye.validators;
      class en {
        constructor(h) {
          this.defaults = h || {}, this.interceptors = { request: new we(), response: new we() };
        }
        async request(h, y) {
          try {
            return await this._request(h, y);
          } catch (v) {
            if (v instanceof Error) {
              let _ = {};
              Error.captureStackTrace ? Error.captureStackTrace(_) : _ = new Error();
              const B = _.stack ? _.stack.replace(/^.+\n/, "") : "";
              try {
                v.stack ? B && !String(v.stack).endsWith(B.replace(/^.+\n.+\n/, "")) && (v.stack += `
` + B) : v.stack = B;
              } catch {
              }
            }
            throw v;
          }
        }
        _request(h, y) {
          typeof h == "string" ? (y = y || {}).url = h : y = h || {}, y = Qe(this.defaults, y);
          const { transitional: v, paramsSerializer: _, headers: B } = y;
          v !== void 0 && Ye.assertOptions(v, { silentJSONParsing: We.transitional(We.boolean), forcedJSONParsing: We.transitional(We.boolean), clarifyTimeoutError: We.transitional(We.boolean) }, !1), _ != null && (n.isFunction(_) ? y.paramsSerializer = { serialize: _ } : Ye.assertOptions(_, { encode: We.function, serialize: We.function }, !0)), y.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? y.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : y.allowAbsoluteUrls = !0), Ye.assertOptions(y, { baseUrl: We.spelling("baseURL"), withXsrfToken: We.spelling("withXSRFToken") }, !0), y.method = (y.method || this.defaults.method || "get").toLowerCase();
          let F = B && n.merge(B.common, B[y.method]);
          B && n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (Zt) => {
            delete B[Zt];
          }), y.headers = Bt.concat(F, B);
          const tt = [];
          let ft = !0;
          this.interceptors.request.forEach(function(Zt) {
            typeof Zt.runWhen == "function" && Zt.runWhen(y) === !1 || (ft = ft && Zt.synchronous, tt.unshift(Zt.fulfilled, Zt.rejected));
          });
          const gt = [];
          let bt;
          this.interceptors.response.forEach(function(Zt) {
            gt.push(Zt.fulfilled, Zt.rejected);
          });
          let Ft, xt = 0;
          if (!ft) {
            const Zt = [ne.bind(this), void 0];
            for (Zt.unshift(...tt), Zt.push(...gt), Ft = Zt.length, bt = Promise.resolve(y); xt < Ft; ) bt = bt.then(Zt[xt++], Zt[xt++]);
            return bt;
          }
          Ft = tt.length;
          let $t = y;
          for (; xt < Ft; ) {
            const Zt = tt[xt++], Vt = tt[xt++];
            try {
              $t = Zt($t);
            } catch (ue) {
              Vt.call(this, ue);
              break;
            }
          }
          try {
            bt = ne.call(this, $t);
          } catch (Zt) {
            return Promise.reject(Zt);
          }
          for (xt = 0, Ft = gt.length; xt < Ft; ) bt = bt.then(gt[xt++], gt[xt++]);
          return bt;
        }
        getUri(h) {
          return Qt(yn((h = Qe(this.defaults, h)).baseURL, h.url, h.allowAbsoluteUrls), h.params, h.paramsSerializer);
        }
      }
      n.forEach(["delete", "get", "head", "options"], function(o) {
        en.prototype[o] = function(h, y) {
          return this.request(Qe(y || {}, { method: o, url: h, data: (y || {}).data }));
        };
      }), n.forEach(["post", "put", "patch"], function(o) {
        function h(y) {
          return function(v, _, B) {
            return this.request(Qe(B || {}, { method: o, headers: y ? { "Content-Type": "multipart/form-data" } : {}, url: v, data: _ }));
          };
        }
        en.prototype[o] = h(), en.prototype[o + "Form"] = h(!0);
      });
      var cn = en;
      class xn {
        constructor(h) {
          if (typeof h != "function") throw new TypeError("executor must be a function.");
          let y;
          this.promise = new Promise(function(_) {
            y = _;
          });
          const v = this;
          this.promise.then((_) => {
            if (!v._listeners) return;
            let B = v._listeners.length;
            for (; B-- > 0; ) v._listeners[B](_);
            v._listeners = null;
          }), this.promise.then = (_) => {
            let B;
            const F = new Promise((tt) => {
              v.subscribe(tt), B = tt;
            }).then(_);
            return F.cancel = function() {
              v.unsubscribe(B);
            }, F;
          }, h(function(_, B, F) {
            v.reason || (v.reason = new he(_, B, F), y(v.reason));
          });
        }
        throwIfRequested() {
          if (this.reason) throw this.reason;
        }
        subscribe(h) {
          this.reason ? h(this.reason) : this._listeners ? this._listeners.push(h) : this._listeners = [h];
        }
        unsubscribe(h) {
          if (!this._listeners) return;
          const y = this._listeners.indexOf(h);
          y !== -1 && this._listeners.splice(y, 1);
        }
        toAbortSignal() {
          const h = new AbortController(), y = (v) => {
            h.abort(v);
          };
          return this.subscribe(y), h.signal.unsubscribe = () => this.unsubscribe(y), h.signal;
        }
        static source() {
          let h;
          return { token: new xn(function(y) {
            h = y;
          }), cancel: h };
        }
      }
      var _n = xn;
      const Dn = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
      Object.entries(Dn).forEach(([o, h]) => {
        Dn[h] = o;
      });
      var Bn = Dn;
      const Le = function o(h) {
        const y = new cn(h), v = Pt(cn.prototype.request, y);
        return n.extend(v, cn.prototype, y, { allOwnKeys: !0 }), n.extend(v, y, null, { allOwnKeys: !0 }), v.create = function(_) {
          return o(Qe(h, _));
        }, v;
      }(T);
      Le.Axios = cn, Le.CanceledError = he, Le.CancelToken = _n, Le.isCancel = me, Le.VERSION = pe, Le.toFormData = X, Le.AxiosError = f, Le.Cancel = Le.CanceledError, Le.all = function(o) {
        return Promise.all(o);
      }, Le.spread = function(o) {
        return function(h) {
          return o.apply(null, h);
        };
      }, Le.isAxiosError = function(o) {
        return n.isObject(o) && o.isAxiosError === !0;
      }, Le.mergeConfig = Qe, Le.AxiosHeaders = Bt, Le.formToJSON = (o) => ht(n.isHTMLForm(o) ? new FormData(o) : o), Le.getAdapter = ut, Le.HttpStatusCode = Bn, Le.default = Le, d.exports = Le;
    }, 855(d, M, K) {
      function Pt(A) {
        return Pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(R) {
          return typeof R;
        } : function(R) {
          return R && typeof Symbol == "function" && R.constructor === Symbol && R !== Symbol.prototype ? "symbol" : typeof R;
        }, Pt(A);
      }
      function pt() {
        return typeof XMLHttpRequest == "function" || (typeof XMLHttpRequest > "u" ? "undefined" : Pt(XMLHttpRequest)) === "object";
      }
      function _t(A, R) {
        var N = Object.keys(A);
        if (Object.getOwnPropertySymbols) {
          var C = Object.getOwnPropertySymbols(A);
          R && (C = C.filter(function(V) {
            return Object.getOwnPropertyDescriptor(A, V).enumerable;
          })), N.push.apply(N, C);
        }
        return N;
      }
      function Kt(A) {
        for (var R = 1; R < arguments.length; R++) {
          var N = arguments[R] != null ? arguments[R] : {};
          R % 2 ? _t(Object(N), !0).forEach(function(C) {
            Ht(A, C, N[C]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(N)) : _t(Object(N)).forEach(function(C) {
            Object.defineProperty(A, C, Object.getOwnPropertyDescriptor(N, C));
          });
        }
        return A;
      }
      function Ht(A, R, N) {
        return (R = function(C) {
          var V = function(m) {
            if (Ot(m) != "object" || !m) return m;
            var D = m[Symbol.toPrimitive];
            if (D !== void 0) {
              var dt = D.call(m, "string");
              if (Ot(dt) != "object") return dt;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(m);
          }(C);
          return Ot(V) == "symbol" ? V : V + "";
        }(R)) in A ? Object.defineProperty(A, R, { value: N, enumerable: !0, configurable: !0, writable: !0 }) : A[R] = N, A;
      }
      function Ot(A) {
        return Ot = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(R) {
          return typeof R;
        } : function(R) {
          return R && typeof Symbol == "function" && R.constructor === Symbol && R !== Symbol.prototype ? "symbol" : typeof R;
        }, Ot(A);
      }
      K.r(M), K.d(M, { default: () => jt });
      var Et, Z, kt = typeof fetch == "function" ? fetch : void 0;
      if (K.g !== void 0 && K.g.fetch ? kt = K.g.fetch : typeof window < "u" && window.fetch && (kt = window.fetch), pt() && (K.g !== void 0 && K.g.XMLHttpRequest ? Et = K.g.XMLHttpRequest : typeof window < "u" && window.XMLHttpRequest && (Et = window.XMLHttpRequest)), typeof ActiveXObject == "function" && (K.g !== void 0 && K.g.ActiveXObject ? Z = K.g.ActiveXObject : typeof window < "u" && window.ActiveXObject && (Z = window.ActiveXObject)), typeof kt != "function" && (kt = void 0), !kt && !Et && !Z) try {
        Promise.resolve().then(K.t.bind(K, 911, 19)).then(function(A) {
          kt = A.default;
        }).catch(function() {
        });
      } catch {
      }
      var Ut = function(A, R) {
        if (R && Ot(R) === "object") {
          var N = "";
          for (var C in R) N += "&" + encodeURIComponent(C) + "=" + encodeURIComponent(R[C]);
          if (!N) return A;
          A = A + (A.indexOf("?") !== -1 ? "&" : "?") + N.slice(1);
        }
        return A;
      }, Wt = function(A, R, N, C) {
        var V = function(D) {
          if (!D.ok) return N(D.statusText || "Error", { status: D.status });
          D.text().then(function(dt) {
            N(null, { status: D.status, data: dt });
          }).catch(N);
        };
        if (C) {
          var m = C(A, R);
          if (m instanceof Promise) return void m.then(V).catch(N);
        }
        typeof fetch == "function" ? fetch(A, R).then(V).catch(N) : kt(A, R).then(V).catch(N);
      }, Xt = !1;
      const se = function(A, R, N, C) {
        return typeof N == "function" && (C = N, N = void 0), C = C || function() {
        }, kt && R.indexOf("file:") !== 0 ? function(V, m, D, dt) {
          V.queryStringParams && (m = Ut(m, V.queryStringParams));
          var yt = Kt({}, typeof V.customHeaders == "function" ? V.customHeaders() : V.customHeaders);
          typeof window > "u" && K.g !== void 0 && K.g.process !== void 0 && K.g.process.versions && K.g.process.versions.node && (yt["User-Agent"] = "i18next-http-backend (node/".concat(K.g.process.version, "; ").concat(K.g.process.platform, " ").concat(K.g.process.arch, ")")), D && (yt["Content-Type"] = "application/json");
          var at = typeof V.requestOptions == "function" ? V.requestOptions(D) : V.requestOptions, j = Kt({ method: D ? "POST" : "GET", body: D ? V.stringify(D) : void 0, headers: yt }, Xt ? {} : at), E = typeof V.alternateFetch == "function" && V.alternateFetch.length >= 1 ? V.alternateFetch : void 0;
          try {
            Wt(m, j, dt, E);
          } catch (q) {
            if (!at || Object.keys(at).length === 0 || !q.message || q.message.indexOf("not implemented") < 0) return dt(q);
            try {
              Object.keys(at).forEach(function(Y) {
                delete j[Y];
              }), Wt(m, j, dt, E), Xt = !0;
            } catch (Y) {
              dt(Y);
            }
          }
        }(A, R, N, C) : pt() || typeof ActiveXObject == "function" ? function(V, m, D, dt) {
          D && Ot(D) === "object" && (D = Ut("", D).slice(1)), V.queryStringParams && (m = Ut(m, V.queryStringParams));
          try {
            var yt = Et ? new Et() : new Z("MSXML2.XMLHTTP.3.0");
            yt.open(D ? "POST" : "GET", m, 1), V.crossDomain || yt.setRequestHeader("X-Requested-With", "XMLHttpRequest"), yt.withCredentials = !!V.withCredentials, D && yt.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), yt.overrideMimeType && yt.overrideMimeType("application/json");
            var at = V.customHeaders;
            if (at = typeof at == "function" ? at() : at) for (var j in at) yt.setRequestHeader(j, at[j]);
            yt.onreadystatechange = function() {
              yt.readyState > 3 && dt(yt.status >= 400 ? yt.statusText : null, { status: yt.status, data: yt.responseText });
            }, yt.send(D);
          } catch (E) {
            console && console.log(E);
          }
        }(A, R, N, C) : void C(new Error("No fetch and no xhr implementation found!"));
      };
      function oe(A) {
        return oe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(R) {
          return typeof R;
        } : function(R) {
          return R && typeof Symbol == "function" && R.constructor === Symbol && R !== Symbol.prototype ? "symbol" : typeof R;
        }, oe(A);
      }
      function qt(A, R) {
        var N = Object.keys(A);
        if (Object.getOwnPropertySymbols) {
          var C = Object.getOwnPropertySymbols(A);
          R && (C = C.filter(function(V) {
            return Object.getOwnPropertyDescriptor(A, V).enumerable;
          })), N.push.apply(N, C);
        }
        return N;
      }
      function re(A) {
        for (var R = 1; R < arguments.length; R++) {
          var N = arguments[R] != null ? arguments[R] : {};
          R % 2 ? qt(Object(N), !0).forEach(function(C) {
            At(A, C, N[C]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(N)) : qt(Object(N)).forEach(function(C) {
            Object.defineProperty(A, C, Object.getOwnPropertyDescriptor(N, C));
          });
        }
        return A;
      }
      function Tt(A, R) {
        for (var N = 0; N < R.length; N++) {
          var C = R[N];
          C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(A, te(C.key), C);
        }
      }
      function At(A, R, N) {
        return (R = te(R)) in A ? Object.defineProperty(A, R, { value: N, enumerable: !0, configurable: !0, writable: !0 }) : A[R] = N, A;
      }
      function te(A) {
        var R = function(N) {
          if (oe(N) != "object" || !N) return N;
          var C = N[Symbol.toPrimitive];
          if (C !== void 0) {
            var V = C.call(N, "string");
            if (oe(V) != "object") return V;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(N);
        }(A);
        return oe(R) == "symbol" ? R : R + "";
      }
      var ce, Ct, mt = (ce = function A(R) {
        var N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        (function(V, m) {
          if (!(V instanceof m)) throw new TypeError("Cannot call a class as a function");
        })(this, A), this.services = R, this.options = N, this.allOptions = C, this.type = "backend", this.init(R, N, C);
      }, Ct = [{ key: "init", value: function(A) {
        var R = this, N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (this.services = A, this.options = re(re(re({}, { loadPath: "/locales/{{lng}}/{{ns}}.json", addPath: "/locales/add/{{lng}}/{{ns}}", parse: function(m) {
          return JSON.parse(m);
        }, stringify: JSON.stringify, parsePayload: function(m, D, dt) {
          return At({}, D, dt || "");
        }, parseLoadPayload: function(m, D) {
        }, request: se, reloadInterval: typeof window > "u" && 36e5, customHeaders: {}, queryStringParams: {}, crossDomain: !1, withCredentials: !1, overrideMimeType: !1, requestOptions: { mode: "cors", credentials: "same-origin", cache: "default" } }), this.options || {}), N), this.allOptions = C, this.services && this.options.reloadInterval) {
          var V = setInterval(function() {
            return R.reload();
          }, this.options.reloadInterval);
          oe(V) === "object" && typeof V.unref == "function" && V.unref();
        }
      } }, { key: "readMulti", value: function(A, R, N) {
        this._readAny(A, A, R, R, N);
      } }, { key: "read", value: function(A, R, N) {
        this._readAny([A], A, [R], R, N);
      } }, { key: "_readAny", value: function(A, R, N, C, V) {
        var m, D = this, dt = this.options.loadPath;
        typeof this.options.loadPath == "function" && (dt = this.options.loadPath(A, N)), (dt = function(yt) {
          return !!yt && typeof yt.then == "function";
        }(m = dt) ? m : Promise.resolve(m)).then(function(yt) {
          if (!yt) return V(null, {});
          var at = D.services.interpolator.interpolate(yt, { lng: A.join("+"), ns: N.join("+") });
          D.loadUrl(at, V, R, C);
        });
      } }, { key: "loadUrl", value: function(A, R, N, C) {
        var V = this, m = typeof N == "string" ? [N] : N, D = typeof C == "string" ? [C] : C, dt = this.options.parseLoadPayload(m, D);
        this.options.request(this.options, A, dt, function(yt, at) {
          if (at && (at.status >= 500 && at.status < 600 || !at.status)) return R("failed loading " + A + "; status code: " + at.status, !0);
          if (at && at.status >= 400 && at.status < 500) return R("failed loading " + A + "; status code: " + at.status, !1);
          if (!at && yt && yt.message) {
            var j = yt.message.toLowerCase();
            if (["failed", "fetch", "network", "load"].find(function(Y) {
              return j.indexOf(Y) > -1;
            })) return R("failed loading " + A + ": " + yt.message, !0);
          }
          if (yt) return R(yt, !1);
          var E, q;
          try {
            E = typeof at.data == "string" ? V.options.parse(at.data, N, C) : at.data;
          } catch {
            q = "failed parsing " + A + " to json";
          }
          if (q) return R(q, !1);
          R(null, E);
        });
      } }, { key: "create", value: function(A, R, N, C, V) {
        var m = this;
        if (this.options.addPath) {
          typeof A == "string" && (A = [A]);
          var D = this.options.parsePayload(R, N, C), dt = 0, yt = [], at = [];
          A.forEach(function(j) {
            var E = m.options.addPath;
            typeof m.options.addPath == "function" && (E = m.options.addPath(j, R));
            var q = m.services.interpolator.interpolate(E, { lng: j, ns: R });
            m.options.request(m.options, q, D, function(Y, Oe) {
              dt += 1, yt.push(Y), at.push(Oe), dt === A.length && typeof V == "function" && V(yt, at);
            });
          });
        }
      } }, { key: "reload", value: function() {
        var A = this, R = this.services, N = R.backendConnector, C = R.languageUtils, V = R.logger, m = N.language;
        if (!m || m.toLowerCase() !== "cimode") {
          var D = [], dt = function(yt) {
            C.toResolveHierarchy(yt).forEach(function(at) {
              D.indexOf(at) < 0 && D.push(at);
            });
          };
          dt(m), this.allOptions.preload && this.allOptions.preload.forEach(function(yt) {
            return dt(yt);
          }), D.forEach(function(yt) {
            A.allOptions.ns.forEach(function(at) {
              N.read(yt, at, "read", null, null, function(j, E) {
                j && V.warn("loading namespace ".concat(at, " for language ").concat(yt, " failed"), j), !j && E && V.log("loaded namespace ".concat(at, " for language ").concat(yt), E), N.loaded("".concat(yt, "|").concat(at), j, E);
              });
            });
          });
        }
      } }], Ct && Tt(ce.prototype, Ct), Object.defineProperty(ce, "prototype", { writable: !1 }), ce);
      mt.type = "backend";
      const jt = mt;
    }, 176(d, M, K) {
      K.r(M), K.d(M, { default: () => ce });
      var { slice: Pt, forEach: pt } = [], _t = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Kt = { create(Ct, mt, jt, A) {
        var R = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : { path: "/", sameSite: "strict" };
        jt && (R.expires = /* @__PURE__ */ new Date(), R.expires.setTime(R.expires.getTime() + 60 * jt * 1e3)), A && (R.domain = A), document.cookie = function(N, C) {
          var V = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { path: "/" }, m = encodeURIComponent(C), D = "".concat(N, "=").concat(m);
          if (V.maxAge > 0) {
            var dt = V.maxAge - 0;
            if (Number.isNaN(dt)) throw new Error("maxAge should be a Number");
            D += "; Max-Age=".concat(Math.floor(dt));
          }
          if (V.domain) {
            if (!_t.test(V.domain)) throw new TypeError("option domain is invalid");
            D += "; Domain=".concat(V.domain);
          }
          if (V.path) {
            if (!_t.test(V.path)) throw new TypeError("option path is invalid");
            D += "; Path=".concat(V.path);
          }
          if (V.expires) {
            if (typeof V.expires.toUTCString != "function") throw new TypeError("option expires is invalid");
            D += "; Expires=".concat(V.expires.toUTCString());
          }
          if (V.httpOnly && (D += "; HttpOnly"), V.secure && (D += "; Secure"), V.sameSite) switch (typeof V.sameSite == "string" ? V.sameSite.toLowerCase() : V.sameSite) {
            case !0:
              D += "; SameSite=Strict";
              break;
            case "lax":
              D += "; SameSite=Lax";
              break;
            case "strict":
              D += "; SameSite=Strict";
              break;
            case "none":
              D += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
          return V.partitioned && (D += "; Partitioned"), D;
        }(Ct, mt, R);
      }, read(Ct) {
        for (var mt = "".concat(Ct, "="), jt = document.cookie.split(";"), A = 0; A < jt.length; A++) {
          for (var R = jt[A]; R.charAt(0) === " "; ) R = R.substring(1, R.length);
          if (R.indexOf(mt) === 0) return R.substring(mt.length, R.length);
        }
        return null;
      }, remove(Ct, mt) {
        this.create(Ct, "", -1, mt);
      } }, Ht = { name: "cookie", lookup(Ct) {
        var { lookupCookie: mt } = Ct;
        if (mt && typeof document < "u") return Kt.read(mt) || void 0;
      }, cacheUserLanguage(Ct, mt) {
        var { lookupCookie: jt, cookieMinutes: A, cookieDomain: R, cookieOptions: N } = mt;
        jt && typeof document < "u" && Kt.create(jt, Ct, A, R, N);
      } }, Ot = { name: "querystring", lookup(Ct) {
        var mt, { lookupQuerystring: jt } = Ct;
        if (typeof window < "u") {
          var A, { search: R } = window.location;
          !window.location.search && ((A = window.location.hash) === null || A === void 0 ? void 0 : A.indexOf("?")) > -1 && (R = window.location.hash.substring(window.location.hash.indexOf("?")));
          for (var N = R.substring(1).split("&"), C = 0; C < N.length; C++) {
            var V = N[C].indexOf("=");
            V > 0 && N[C].substring(0, V) === jt && (mt = N[C].substring(V + 1));
          }
        }
        return mt;
      } }, Et = { name: "hash", lookup(Ct) {
        var mt, { lookupHash: jt, lookupFromHashIndex: A } = Ct;
        if (typeof window < "u") {
          var { hash: R } = window.location;
          if (R && R.length > 2) {
            var N = R.substring(1);
            if (jt) for (var C = N.split("&"), V = 0; V < C.length; V++) {
              var m = C[V].indexOf("=");
              m > 0 && C[V].substring(0, m) === jt && (mt = C[V].substring(m + 1));
            }
            if (mt) return mt;
            if (!mt && A > -1) {
              var D, dt = R.match(/\/([a-zA-Z-]*)/g);
              return Array.isArray(dt) ? (D = dt[typeof A == "number" ? A : 0]) === null || D === void 0 ? void 0 : D.replace("/", "") : void 0;
            }
          }
        }
        return mt;
      } }, Z = null, kt = () => {
        if (Z !== null) return Z;
        try {
          if (!(Z = typeof window < "u" && window.localStorage !== null)) return !1;
          var Ct = "i18next.translate.boo";
          window.localStorage.setItem(Ct, "foo"), window.localStorage.removeItem(Ct);
        } catch {
          Z = !1;
        }
        return Z;
      }, Ut = { name: "localStorage", lookup(Ct) {
        var { lookupLocalStorage: mt } = Ct;
        if (mt && kt()) return window.localStorage.getItem(mt) || void 0;
      }, cacheUserLanguage(Ct, mt) {
        var { lookupLocalStorage: jt } = mt;
        jt && kt() && window.localStorage.setItem(jt, Ct);
      } }, Wt = null, Xt = () => {
        if (Wt !== null) return Wt;
        try {
          if (!(Wt = typeof window < "u" && window.sessionStorage !== null)) return !1;
          var Ct = "i18next.translate.boo";
          window.sessionStorage.setItem(Ct, "foo"), window.sessionStorage.removeItem(Ct);
        } catch {
          Wt = !1;
        }
        return Wt;
      }, se = { name: "sessionStorage", lookup(Ct) {
        var { lookupSessionStorage: mt } = Ct;
        if (mt && Xt()) return window.sessionStorage.getItem(mt) || void 0;
      }, cacheUserLanguage(Ct, mt) {
        var { lookupSessionStorage: jt } = mt;
        jt && Xt() && window.sessionStorage.setItem(jt, Ct);
      } }, oe = { name: "navigator", lookup(Ct) {
        var mt = [];
        if (typeof navigator < "u") {
          var { languages: jt, userLanguage: A, language: R } = navigator;
          if (jt) for (var N = 0; N < jt.length; N++) mt.push(jt[N]);
          A && mt.push(A), R && mt.push(R);
        }
        return mt.length > 0 ? mt : void 0;
      } }, qt = { name: "htmlTag", lookup(Ct) {
        var mt, { htmlTag: jt } = Ct, A = jt || (typeof document < "u" ? document.documentElement : null);
        return A && typeof A.getAttribute == "function" && (mt = A.getAttribute("lang")), mt;
      } }, re = { name: "path", lookup(Ct) {
        var mt, { lookupFromPathIndex: jt } = Ct;
        if (typeof window < "u") {
          var A = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
          if (Array.isArray(A)) return (mt = A[typeof jt == "number" ? jt : 0]) === null || mt === void 0 ? void 0 : mt.replace("/", "");
        }
      } }, Tt = { name: "subdomain", lookup(Ct) {
        var mt, { lookupFromSubdomainIndex: jt } = Ct, A = typeof jt == "number" ? jt + 1 : 1, R = typeof window < "u" && ((mt = window.location) === null || mt === void 0 || (mt = mt.hostname) === null || mt === void 0 ? void 0 : mt.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i));
        if (R) return R[A];
      } }, At = !1;
      try {
        document.cookie, At = !0;
      } catch {
      }
      var te = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
      At || te.splice(1, 1);
      class ce {
        constructor(mt) {
          var jt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          this.type = "languageDetector", this.detectors = {}, this.init(mt, jt);
        }
        init() {
          var mt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { languageUtils: {} }, jt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, A = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          this.services = mt, this.options = function(R) {
            return pt.call(Pt.call(arguments, 1), (N) => {
              if (N) for (var C in N) R[C] === void 0 && (R[C] = N[C]);
            }), R;
          }(jt, this.options || {}, { order: te, lookupQuerystring: "lng", lookupCookie: "i18next", lookupLocalStorage: "i18nextLng", lookupSessionStorage: "i18nextLng", caches: ["localStorage"], excludeCacheFor: ["cimode"], convertDetectedLanguage: (R) => R }), typeof this.options.convertDetectedLanguage == "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1 && (this.options.convertDetectedLanguage = (R) => R.replace("-", "_")), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = A, this.addDetector(Ht), this.addDetector(Ot), this.addDetector(Ut), this.addDetector(se), this.addDetector(oe), this.addDetector(qt), this.addDetector(re), this.addDetector(Tt), this.addDetector(Et);
        }
        addDetector(mt) {
          return this.detectors[mt.name] = mt, this;
        }
        detect() {
          var mt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order, jt = [];
          return mt.forEach((A) => {
            if (this.detectors[A]) {
              var R = this.detectors[A].lookup(this.options);
              R && typeof R == "string" && (R = [R]), R && (jt = jt.concat(R));
            }
          }), jt = jt.filter((A) => {
            return A != null && !(typeof (R = A) == "string" && [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i].some((N) => N.test(R)));
            var R;
          }).map((A) => this.options.convertDetectedLanguage(A)), this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes ? jt : jt.length > 0 ? jt[0] : null;
        }
        cacheUserLanguage(mt) {
          var jt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
          jt && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(mt) > -1 || jt.forEach((A) => {
            this.detectors[A] && this.detectors[A].cacheUserLanguage(mt, this.options);
          }));
        }
      }
      ce.type = "languageDetector";
    } }, _e = {};
    function ae(d) {
      var M = _e[d];
      if (M !== void 0) return M.exports;
      var K = _e[d] = { exports: {} };
      return ke[d](K, K.exports, ae), K.exports;
    }
    ae.n = (d) => {
      var M = d && d.__esModule ? () => d.default : () => d;
      return ae.d(M, { a: M }), M;
    }, fe = Object.getPrototypeOf ? (d) => Object.getPrototypeOf(d) : (d) => d.__proto__, ae.t = function(d, M) {
      if (1 & M && (d = this(d)), 8 & M || typeof d == "object" && d && (4 & M && d.__esModule || 16 & M && typeof d.then == "function"))
        return d;
      var K = /* @__PURE__ */ Object.create(null);
      ae.r(K);
      var Pt = {};
      Rt = Rt || [null, fe({}), fe([]), fe(fe)];
      for (var pt = 2 & M && d; (typeof pt == "object" || typeof pt == "function") && !~Rt.indexOf(pt); pt = fe(pt)) Object.getOwnPropertyNames(pt).forEach((_t) => Pt[_t] = () => d[_t]);
      return Pt.default = () => d, ae.d(K, Pt), K;
    }, ae.d = (d, M) => {
      for (var K in M) ae.o(M, K) && !ae.o(d, K) && Object.defineProperty(d, K, { enumerable: !0, get: M[K] });
    }, ae.g = function() {
      if (typeof globalThis == "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object") return window;
      }
    }(), ae.o = (d, M) => Object.prototype.hasOwnProperty.call(d, M), ae.r = (d) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(d, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(d, "__esModule", { value: !0 });
    };
    var qe = {};
    return (() => {
      ae.r(qe), ae.d(qe, { Desktop: () => bn });
      var d = ae(542);
      const M = (0, d.createLogger)("agentx-js-api"), K = (p, e) => ({ info: (...s) => p.info(e, ...s), warn: (...s) => p.warn(e, ...s), error: (...s) => p.error(e, ...s) });
      class Pt {
        constructor(e) {
          this.logger = e.logger;
        }
        check(e) {
          return e ? !!e.isInited || (this.logger.error("SERVICE still not initialized... Await it's init(...) first."), !1) : (this.logger.error("SERVICE is not defined..."), !1);
        }
      }
      const pt = (p) => new Pt(p);
      var _t = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const Kt = "jsapi", Ht = { rps: 120, tag: Kt }, Ot = { rps: 0, tag: Kt }, Et = { tag: Kt }, Z = (p) => p.actionsChannels.createSource("fireGeneralSilentNotification/Req", Ht), kt = (p) => p.actionsChannels.createSource("fireGeneralAutoDismissNotification/Req", Ot), Ut = (p) => p.actionsChannels.createDestination("fireGeneralAutoDismissNotification/Res", Ot), Wt = (p) => p.actionsChannels.createSource("fireGeneralAcknowledgeNotification/Req", Ot), Xt = (p) => p.actionsChannels.createDestination("fireGeneralAcknowledgeNotification/Res", Ot), se = (p) => p.actionsChannels.createSource("addCustomTask", Ht), oe = (p) => p.actionsChannels.createSource("getToken/Req", Ot), qt = (p) => p.actionsChannels.createDestination("getToken/Res", Et), re = (p) => p.actionsChannels.createSource("getTaskMap/Req", Ot), Tt = (p) => p.actionsChannels.createDestination("getTaskMap/Res", Et), At = (p) => p.actionsChannels.createSource("getMediaTypeQueue/Req", Ot), te = (p) => p.actionsChannels.createDestination("getMediaTypeQueue/Res", Et), ce = (p) => p.actionsChannels.createSource("getIdleCodes/Req", Ot), Ct = (p) => p.actionsChannels.createDestination("getIdleCodes/Res", Et), mt = (p) => p.actionsChannels.createSource("getWrapUpCodes/Req", Ot), jt = (p) => p.actionsChannels.createDestination("getWrapUpCodes/Res", Et);
      class A {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        getNextReqId() {
          const e = Date.now();
          return this.lastReqTs !== e ? (this.lastReqTs = e, this.lastReqN = 0) : this.lastReqN++, `${this.lastReqTs}_${this.lastReqN}`;
        }
        constructor(e) {
          this.lastReqTs = Date.now(), this.lastReqN = 0, this.toggleMiximizeRestore = (s) => {
            var w;
            if (s && s.target) {
              const c = (w = this.getClosestElement(s.target, ".dynamic-widget-wrapper")) === null || w === void 0 ? void 0 : w.id;
              if (c) {
                const I = new CustomEvent("toggle-maximize-restore", { detail: { widgetId: c } });
                window.dispatchEvent(I), M.info("Dispatching toggle-maximize-restore event for widgetId:", c);
              }
            }
          }, this.toggleVoiceInteractionPanel = () => {
            window.dispatchEvent(new CustomEvent("toggle-voice-interaction-panel")), M.info("Dispatching toggl-voice-interaction-panel");
          }, this.toggleMuteUnmuteWebRtcCall = () => {
            const s = new CustomEvent("ax-web-call-mute-unmute", {});
            window.dispatchEvent(s), M.info("Dispatching ax-web-call-mute-unmute event");
          }, this.declineWebRtcCall = () => {
            const s = new CustomEvent("ax-web-call-decline", {});
            window.dispatchEvent(s), M.info("Dispatching ax-web-call-decline event");
          }, this.acceptWebRtcCall = () => {
            const s = new CustomEvent("ax-web-call-answer", {});
            window.dispatchEvent(s), M.info("Dispatching ax-web-call-answer event");
          }, this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.sourceActionsChannels = { fireGeneralSilentNotification: Z(this.SERVICE), fireGeneralAutoDismissNotification: kt(this.SERVICE), fireGeneralAcknowledgeNotification: Wt(this.SERVICE), addCustomTask: se(this.SERVICE), getToken: oe(this.SERVICE), getTaskMap: re(this.SERVICE), getMediaTypeQueue: At(this.SERVICE), getIdleCodes: ce(this.SERVICE), getWrapUpCodes: mt(this.SERVICE) }, this.destinationActionsChannels = { fireGeneralAutoDismissNotification: Ut(this.SERVICE), fireGeneralAcknowledgeNotification: Xt(this.SERVICE), getToken: qt(this.SERVICE), getTaskMap: Tt(this.SERVICE), getMediaTypeQueue: te(this.SERVICE), getIdleCodes: Ct(this.SERVICE), getWrapUpCodes: jt(this.SERVICE) }, this.logger.info("Inited"));
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        fireGeneralSilentNotification(...e) {
          this.checkService() && this.sourceActionsChannels.fireGeneralSilentNotification.send(...e);
        }
        fireGeneralAutoDismissNotification(...e) {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((s) => {
              const w = this.getNextReqId(), c = ({ args: [I, wt, St, Lt] }) => {
                Lt === w && (St !== d.Notifications.ItemMeta.Mode.AutoDismiss && St !== d.Notifications.ItemMeta.Mode.Silent || I === d.Notifications.ItemMeta.Status.Deactivated && (s([I, wt, St]), this.destinationActionsChannels.fireGeneralAutoDismissNotification.removeListener(c)));
              };
              this.destinationActionsChannels.fireGeneralAutoDismissNotification.addListener(c), this.sourceActionsChannels.fireGeneralAutoDismissNotification.send(...e);
            });
          });
        }
        fireGeneralAcknowledgeNotification(...e) {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((s) => {
              const w = this.getNextReqId(), c = ({ args: [I, wt, St, Lt] }) => {
                Lt === w && (St !== d.Notifications.ItemMeta.Mode.Acknowledge && St !== d.Notifications.ItemMeta.Mode.Silent || I === d.Notifications.ItemMeta.Status.Deactivated && (s([I, wt, St]), this.destinationActionsChannels.fireGeneralAcknowledgeNotification.removeListener(c)));
              };
              this.destinationActionsChannels.fireGeneralAcknowledgeNotification.addListener(c), this.sourceActionsChannels.fireGeneralAcknowledgeNotification.send(...e);
            });
          });
        }
        addCustomTask(...e) {
          this.checkService() && this.sourceActionsChannels.addCustomTask.send(...e);
        }
        getTaskMap() {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((e) => {
              const s = this.getNextReqId(), w = ({ args: [c, I] }) => {
                I === s && (e(c), this.destinationActionsChannels.getTaskMap.removeListener(w));
              };
              this.destinationActionsChannels.getTaskMap.addListener(w), this.sourceActionsChannels.getTaskMap.send(s);
            });
          });
        }
        getMediaTypeQueue(e) {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((s) => {
              const w = this.getNextReqId(), c = ({ args: [I, wt] }) => {
                wt === w && (s(I), this.destinationActionsChannels.getMediaTypeQueue.removeListener(c));
              };
              this.destinationActionsChannels.getMediaTypeQueue.addListener(c), this.sourceActionsChannels.getMediaTypeQueue.send(e, w);
            });
          });
        }
        getToken() {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((e) => {
              const s = this.getNextReqId(), w = ({ args: [c, I] }) => {
                I === s && (e(c), this.destinationActionsChannels.getToken.removeListener(w));
              };
              this.destinationActionsChannels.getToken.addListener(w), this.sourceActionsChannels.getToken.send(s);
            });
          });
        }
        getIdleCodes() {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((e) => {
              const s = this.getNextReqId(), w = ({ args: [c, I] }) => {
                I === s && (e(c), this.destinationActionsChannels.getIdleCodes.removeListener(w));
              };
              this.destinationActionsChannels.getIdleCodes.addListener(w), this.sourceActionsChannels.getIdleCodes.send(s);
            });
          });
        }
        getWrapUpCodes() {
          return _t(this, void 0, void 0, function* () {
            if (this.checkService()) return new Promise((e) => {
              const s = this.getNextReqId(), w = ({ args: [c, I] }) => {
                I === s && (e(c), this.destinationActionsChannels.getWrapUpCodes.removeListener(w));
              };
              this.destinationActionsChannels.getWrapUpCodes.addListener(w), this.sourceActionsChannels.getWrapUpCodes.send(s);
            });
          });
        }
        getClosestElement(e, s) {
          return e && e !== document && e !== window ? e instanceof ShadowRoot ? this.getClosestElement(e.host, s) : e instanceof HTMLElement && e.matches(s) ? e : this.getClosestElement(e.parentNode, s) : null;
        }
      }
      const R = K(M, "[Actions JSAPI] =>");
      class N {
        constructor(e) {
          this.isInited = !1, this.listeners = /* @__PURE__ */ new Map(), this.listenersOnce = /* @__PURE__ */ new Map(), this.logger = e.logger;
        }
        init(e) {
          this.aqmServiceEntity = e.aqmServiceEntity, this.aqmServiceEntityString = e.aqmServiceEntityString, this.isInited = !0;
        }
        cleanup() {
          this.removeAllEventListeners(), this.aqmServiceEntity = void 0, this.aqmServiceEntityString = void 0, this.isInited = !1;
        }
        _addEventListener(e, s, w) {
          var c, I, wt;
          const St = w ? "listenersOnce" : "listeners";
          this[St].has(e) || this[St].set(e, /* @__PURE__ */ new Map());
          const Lt = this[St].get(e), ut = w ? "listenOnce" : "listen", ot = (ne) => {
            let pe = null;
            return w && (pe = this.aqmServiceEntity[e].listenOnce(() => this.removeOnceEventListener(e, s))), () => {
              var ve;
              if (ne) {
                w ? (ne.stopListenOnce(), pe && pe.stopListenOnce()) : ne.stopListen();
                const xe = [];
                xe.push(`UnBound "${e.toString()}"`), w && xe.push("Once"), this.aqmServiceEntityString && xe.push(`from "${this.aqmServiceEntityString}"`), (ve = this.logger) === null || ve === void 0 || ve.info(xe.join(" "));
              }
            };
          };
          if (this.aqmServiceEntity) if (e in this.aqmServiceEntity && ut in this.aqmServiceEntity[e]) {
            const ne = this.aqmServiceEntity[e][ut](s);
            Lt.set(s, ot(ne));
            const pe = [];
            pe.push(`Bound "${e.toString()}"`), w && pe.push("Once"), this.aqmServiceEntityString && pe.push(`to "${this.aqmServiceEntityString}"`), (c = this.logger) === null || c === void 0 || c.info(pe.join(" "));
          } else (I = this.logger) === null || I === void 0 || I.warn(`EventName "${e.toString()}" is not recognized, so won't be subscribed...`);
          else (wt = this.logger) === null || wt === void 0 || wt.error(`"${this.aqmServiceEntityString}" is not ready yet. .init(...) first...`);
        }
        _removeEventListener(e, s, w) {
          const c = w ? "listenersOnce" : "listeners";
          if (this[c].has(e)) {
            const I = this[c].get(e);
            I && (I.has(s) && (I.get(s)(), I.delete(s)), I.size < 1 && this[c].delete(e));
          }
        }
        addEventListener(e, s) {
          this._addEventListener(e, s, !1);
        }
        addOnceEventListener(e, s) {
          this._addEventListener(e, s, !0);
        }
        removeEventListener(e, s) {
          this._removeEventListener(e, s, !1);
        }
        removeOnceEventListener(e, s) {
          this._removeEventListener(e, s, !0);
        }
        removeAllEventListeners() {
          ["listeners", "listenersOnce"].forEach((e) => {
            this[e].forEach((s, w) => {
              s.forEach((c, I) => c()), s.clear();
            }), this[e].clear();
          });
        }
      }
      const C = (p) => new N(p);
      var V, m, D, dt, yt, at, j, E;
      (function(p) {
        p.TELEPHONY = "telephony", p.CHAT = "chat", p.EMAIL = "email", p.SOCIAL = "social", p.MIDCALL_TELEPHONY = "midcall telephony", p.APPLE_MESSAGES = "appleMessages";
      })(V || (V = {})), function(p) {
        p.QUEUE = "queue", p.DIAL_NUMBER = "dialNumber", p.AGENT = "agent", p.EPDN = "entrypointDialNumber", p.ENTRY_POINT = "entryPoint";
      }(m || (m = {})), function(p) {
        p.IDLE = "Idle", p.AVAILABLE = "Available", p.RONA = "RONA";
      }(D || (D = {})), function(p) {
        p.All = "All", p.TELEPHONY = "telephony", p.CHAT = "chat", p.EMAIL = "email", p.SOCIAL = "social";
      }(dt || (dt = {})), function(p) {
        p.SMS = "SMS", p.TELEPHONY = "Call", p.CHAT = "Chat", p.EMAIL = "Email", p.MESSENGER = "Messenger", p.WHATSAPP = "WhatsApp", p.APPLE_BUSINESS_CHAT = "Apple Business Chat", p.GOOGLE_BUSINESS_MESSAGES = "Google's Business Messages";
      }(yt || (yt = {})), function(p) {
        p.MIDCALL = "midcall", p.ADHOC = "adhoc", p.CONTINUOUS = "continuous";
      }(at || (at = {})), function(p) {
        p.EMAIL = "email", p.CHAT = "chat", p.TELEPHONY = "telephony", p.SOCIAL = "social", p.SMS = "sms", p.FACEBOOK = "facebook", p.WHATSAPP = "whatsapp", p.APPLEMESSAGES = "appleMessages", p.GOOGLEMESSAGES = "googleMessages";
      }(j || (j = {})), function(p) {
        const e = "is not a valid UUID", s = "is not a valid media type", w = "is not a valid destination type";
        p.validatePropValueNotNullAndEmpty = (c) => c !== null && c !== "", p.validateAgentState = (c) => Object.values(D).includes(c), p.validateURL = (c) => /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(c), p.validateChannelName = (c) => Object.values(yt).includes(c), p.validateStateChannelType = (c) => Array.isArray(c) && c.length > 0 && c.every((I) => ["telephony", "chat", "email", "social"].includes(I)), p.validateDestinationType = (c) => Object.values(m).includes(c), p.validateMediaType = (c) => Object.values(V).includes(c), p.validateUTCTimeStampNumberFormat = (c) => Number.isInteger(c) && c >= 0 && c <= 4102444799999, p.validateNumber = (c) => Number.isInteger(c) && c >= 0 && c <= 2147483647, p.validateBoolean = (c) => typeof c == "boolean" || (c === 0 || c === 1) && p.validatePropValueNotNullAndEmpty(c), p.validateStringToBoolean = (c) => {
          const I = c == null ? void 0 : c.toLowerCase();
          return I === "true" || I === "false" || I === "0" || I === "1";
        }, p.validateChannelType = (c) => Object.values(yt).includes(c), p.validateMonitorType = (c) => Object.values(at).includes(c), p.validateUUID = (c) => /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(c), p.validateStringNumberOnly = (c) => /^(\+)?\d+$/.test(c), p.validateBuddyAgents = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentProfileId), I, "agentProfileId is not a valid UUID"), d.AssertUtils.check(p.validateChannelName(c == null ? void 0 : c.channelName), I, "channelName is not a valid channel name"), (c == null ? void 0 : c.state) !== void 0 && d.AssertUtils.check(p.validateAgentState(c.state), I, "state is not a valid state"), (c == null ? void 0 : c.trackingId) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.trackingId), I, "trackingId is not a valid string");
        }, p.validateAuxCodeType = (c, I) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c), I, "value is null or empty"), d.AssertUtils.check(c === "IDLE_CODE" || c === "WRAP_UP_CODE", I, "value is not IDLE_CODE or WRAP_UP_CODE");
        }, p.validateAuxCodePayload = (c, I) => {
          p.validateAuxCodeType(c.workType, I), c.page !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.page), I, "page is is null or empty"), c.pageSize !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.pageSize), I, "pageSize is is null or empty"), c.search !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.search), I, "search is is null or empty"), c.customFilter !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.customFilter), I, "customFilter is is null or empty");
        }, p.validateCancelCtq = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentId), I, `agentId ${e}`), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.queueId), I, `queueId ${e}`);
        }, p.validateWrapupPayload = (c, I) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.wrapUpReason), I, "wrapUpReason is not a valid string"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.auxCodeId), I, "auxCodeId is not a valid string"), d.AssertUtils.check(p.validateStringToBoolean(c == null ? void 0 : c.isAutoWrapup), I, "isAutoWrapup is not a valid boolean value");
        }, p.validateVTeamTransferPayload = (c, I) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.vteamId), I, "vteamId is not a valid string"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.vteamType), I, "vteamType is not a valid string");
        }, p.validateBlindTransferPayload = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentId), I, `agentId ${e}`), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.destAgentId), I, `destAgentId ${e}`), d.AssertUtils.check(p.validateMediaType(c == null ? void 0 : c.mediaType), I, s), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.destAgentTeamId), I, "destAgentTeamId is not a valid string"), d.AssertUtils.check(p.validateStringNumberOnly(c == null ? void 0 : c.destAgentDN), I, "destAgentDN is not a numbers only string"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.destSiteId), I, "destSiteId is not a valid string");
        }, p.validateConsultPayload = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentId), I, `agentId ${e}`), (c == null ? void 0 : c.destAgentId) !== void 0 && d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.destAgentId), I, `destAgentId ${e}`), (c == null ? void 0 : c.mediaType) !== void 0 && d.AssertUtils.check(p.validateMediaType(c == null ? void 0 : c.mediaType), I, s), (c == null ? void 0 : c.holdParticipants) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.holdParticipants), I, "holdParticipants is not valid");
        }, p.validateConsultTransferPayLoad = (c, I) => {
          (c == null ? void 0 : c.agentId) !== void 0 && d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentId), I, `agentId ${e}`), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.destAgentId), I, `destagentId ${e}`), d.AssertUtils.check(p.validateMediaType(c == null ? void 0 : c.mediaType), I, s), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.mediaResourceId), I, `mediaResourceId ${e}`), d.AssertUtils.check(p.validateDestinationType(c == null ? void 0 : c.destinationType), I, w);
        }, p.validateWrapUpV2Payload = (c, I) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.wrapUpReason), I, "wrapUpReason is not a valid string"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.auxCodeId), I, "auxCodeId is not a valid string");
        }, p.validateChangeAgentStateType = (c, I) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.state), I, "state is null or empty"), d.AssertUtils.check(c.state.toLowerCase() === "available" || c.state.toLowerCase() === "idle", I, "state is not Available or Idle"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.auxCodeId), I, "auxCodeId is null or empty"), d.AssertUtils.check(p.validateUUID(c.agentId), I, "agentId is not a valid UUID");
        }, p.validateConsultDataV2Payload = (c, I) => {
          (c == null ? void 0 : c.to) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.to), I, "to is not a valid string or not undefined"), d.AssertUtils.check(p.validateDestinationType(c == null ? void 0 : c.destinationType), I, w), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.holdParticipants), I, "holdParticipants is not valid");
        }, p.validateConsultConferenceDataV2Payload = (c, I) => {
          (c == null ? void 0 : c.agentId) !== void 0 && d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentId), I, `agentId ${e}`), (c == null ? void 0 : c.to) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.to), I, "to is not a valid string or not undefined"), d.AssertUtils.check(p.validateDestinationType(c == null ? void 0 : c.destinationType), I, w);
        }, p.validateTransferV2Payload = (c, I) => {
          (c == null ? void 0 : c.to) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.to), I, "to is not a valid string or not undefined"), d.AssertUtils.check(p.validateDestinationType(c == null ? void 0 : c.destinationType), I, w);
        }, p.validateBuddyAgentsV2Payload = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentProfileId), I, `agentProfileId ${e}`), d.AssertUtils.check(p.validateMediaType(c == null ? void 0 : c.mediaType), I, s), d.AssertUtils.check(p.validateAgentState(c == null ? void 0 : c.state), I, "state is not a valid state");
        }, p.validateVTeam = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentProfileId), I, "agentProfileId is not a valid UUID"), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.agentSessionId), I, "agentSessionId is not a valid UUID"), d.AssertUtils.check(p.validateChannelType(c == null ? void 0 : c.channelType), I, "channelType is not a valid channel type"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.type), I, "type is not a valid string"), (c == null ? void 0 : c.trackingId) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.trackingId), I, "trackingId is not a valid string");
        }, p.validateDialerTasks = (c, I) => {
          c != null && c.id && d.AssertUtils.check(p.validateUUID(c.id), I, "id is not a valid UUID"), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.entryPointId), I, "entryPointId is not a valid UUID"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.destination), I, "destination is null or empty"), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.direction), I, "direction is not a valid UUID"), c != null && c.origin && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.origin), I, "origin is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.attributes.key), I, "attributes.key is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.attributes.value), I, "attributes.value is null or empty"), d.AssertUtils.check(p.validateMediaType(c == null ? void 0 : c.mediaType), I, "mediaType is not a valid media type"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.outboundType), I, "outboundType is null or empty");
        }, p.validatePreviewCampaignPayload = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.interactionId), I, "interactionId is not a valid UUID"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c == null ? void 0 : c.campaignId), I, "campaignId is null or empty");
        }, p.validateMonitoringRequest = (c, I) => {
          d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.id), I, "id is not a valid UUID"), d.AssertUtils.check(p.validateMonitorType(c == null ? void 0 : c.monitorType), I, "monitorType is not a valid monitor type"), (c == null ? void 0 : c.queueIds) !== void 0 && c.queueIds.forEach((wt) => {
            d.AssertUtils.check(p.validateUUID(wt), I, "queueIds is not a valid UUID");
          }), (c == null ? void 0 : c.teams) !== void 0 && c.teams.forEach((wt) => {
            d.AssertUtils.check(p.validateUUID(wt), I, "team is not a valid UUID");
          }), (c == null ? void 0 : c.sites) !== void 0 && c.sites.forEach((wt) => {
            d.AssertUtils.check(p.validateUUID(wt), I, "site is not a valid UUID");
          }), (c == null ? void 0 : c.agents) !== void 0 && c.agents.forEach((wt) => {
            d.AssertUtils.check(p.validateUUID(wt), I, "agent is not a valid UUID");
          }), (c == null ? void 0 : c.startUTCTimestamp) !== void 0 && d.AssertUtils.check(p.validateUTCTimeStampNumberFormat(c.startUTCTimestamp), I, "startUTCTimestamp is not a valid timestamp"), (c == null ? void 0 : c.continuousDuration) !== void 0 && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.continuousDuration), I, "continuousDuration is not a valid string or not undefined"), (c == null ? void 0 : c.taskId) !== void 0 && d.AssertUtils.check(p.validateUUID(c.taskId), I, "taskId is not a valid UUID"), d.AssertUtils.check(p.validateUUID(c == null ? void 0 : c.trackingId), I, "trackingId is not a valid UUID"), c != null && c.invisibleMode && d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.invisibleMode), I, "invisibleMode is not a valid string or not undefined");
        }, p.validateMultiConsultPayload = (c, I) => {
          c && Object.entries(c).forEach(([wt, St]) => {
            switch (wt) {
              case "agentId":
                d.AssertUtils.check(p.validateUUID(String(St)), I, `agentId ${e}`);
                break;
              case "destAgentId":
                d.AssertUtils.check(p.validateUUID(String(St)), I, `destAgentId ${e}`);
                break;
              case "mediaType":
                d.AssertUtils.check(p.validateMediaType(St), I, s);
                break;
              case "holdParticipants":
                d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(St), I, "holdParticipants is not valid");
                break;
              case "destAgentDN":
                d.AssertUtils.check(p.validateStringNumberOnly(String(St)), I, "destAgentDN is not a numbers only string");
                break;
              case "destinationType":
                d.AssertUtils.check(p.validateDestinationType(St), I, w);
                break;
              case "destAgentTeamId":
                d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(String(St)), I, "destAgentTeamId is not a valid string");
                break;
              case "destSiteId":
                d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(String(St)), I, "destSiteId is not a valid string");
                break;
              case "queueId":
                d.AssertUtils.check(p.validateUUID(String(St)), I, `queueId ${e}`);
                break;
              case "trackingId":
                d.AssertUtils.check(p.validateUUID(String(St)), I, "trackingId is not a valid string");
            }
          });
        }, p.validateFetchByAssigneeAgentIdType = (c, I, wt) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c), wt, "page is is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(I), wt, "assigneeAgent is is null or empty"), d.AssertUtils.check(p.validateUUID(I), wt, "assigneeAgent is not a valid UUID");
        }, p.validatefetchByCallbackPhoneNumberType = (c, I, wt) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c), wt, "page is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(I), wt, "phoneNumber is is null or empty");
        }, p.validateCreateOrUpdateScheduleCallbackType = (c, I, wt = !1) => {
          wt && (d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.id), I, "id is null or empty"), c.id && d.AssertUtils.check(p.validateUUID(c.id), I, "id is not a valid UUID")), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.customerName), I, "customerName is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.callbackNumber), I, "callbackNumber is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.timezone), I, "timezone is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.scheduleDate), I, "scheduleDate is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.startTime), I, "startTime is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.endTime), I, "endTime is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c.queueId), I, "queueId is null or empty");
        }, p.validateGetValidCampaignTimesType = (c, I, wt) => {
          d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(c), wt, "campaignId is null or empty"), d.AssertUtils.check(p.validatePropValueNotNullAndEmpty(I), wt, "agentId is null or empty"), d.AssertUtils.check(p.validateUUID(I), wt, "agentId is not a valid UUID");
        };
      }(E || (E = {}));
      var q = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const Y = "interactionId is not a valid UUID";
      class Oe {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.contact, aqmServiceEntityString: "SERVICE.aqm.contact" }), this.logger.info("Inited"));
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        sendDtmf(e) {
          this.checkService() && this.SERVICE.webCalling.sendDTMF(Number(e));
        }
        accept(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "accept", Y), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.accept(e);
          });
        }
        consultAccept(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultAccept", Y), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultAccept(e);
          });
        }
        buddyAgents(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateBuddyAgents(e.data, "buddyAgents"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.buddyAgents(e);
          });
        }
        end(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "end", Y), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.end(e);
          });
        }
        consultEnd(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultEnd", Y), d.AssertUtils.check(E.validateBoolean(e.isConsult), "consultEnd", "isConsult is not a valid boolean value"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultEnd(e);
          });
        }
        cancelCtq(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "cancelCtq", Y), E.validateCancelCtq(e.data, "cancelCtq"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.cancelCtq(e);
          });
        }
        wrapup(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "wrapup", Y), E.validateWrapupPayload(e.data, "wrapup"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.wrapup(e);
          });
        }
        vteamTransfer(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "vteamTransfer", Y), E.validateVTeamTransferPayload(e.data, "vteamTransfer"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.vteamTransfer(e);
          });
        }
        blindTransfer(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "blindTransfer", Y), E.validateBlindTransferPayload(e.data, "blindTransfer"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.blindTransfer(e);
          });
        }
        hold(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "hold", Y), d.AssertUtils.check(E.validateUUID((s = e.data) === null || s === void 0 ? void 0 : s.mediaResourceId), "hold", "mediaResourceId is not a valid UUID"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.hold(e);
          });
        }
        unHold(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "unHold", Y), d.AssertUtils.check(E.validateUUID((s = e.data) === null || s === void 0 ? void 0 : s.mediaResourceId), "unHold", "mediaResourceId is not a valid UUID"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.unHold(e);
          });
        }
        consult(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consult", Y), d.AssertUtils.check(E.validateURL(e.url), "consult", "url is not a valid URL"), E.validateMultiConsultPayload(e.data, "consult"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consult(e);
          });
        }
        consultConference(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultConference", Y), E.validateConsultPayload(e.data, "consultConference"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultConference(e);
          });
        }
        decline(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "decline", "ERROR_INTERACTION_ID_INVALID"), d.AssertUtils.check(E.validateUUID((s = e.data) === null || s === void 0 ? void 0 : s.mediaResourceId), "decline", "mediaResourceId is not a valid UUID"), d.AssertUtils.check(E.validateBoolean(e.isConsult), "decline", "isConsult is not a valid boolean value"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.decline(e);
          });
        }
        consultTransfer(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "decline", "ERROR_INTERACTION_ID_INVALID"), E.validateConsultTransferPayLoad(e.data, "consultTransfer"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultTransfer(e);
          });
        }
        vteamList(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateVTeam(e.data, "vteamList"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.vteamList(e);
          });
        }
        pauseRecording(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "pauseRecording", "ERROR_INTERACTION_ID_INVALID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.pauseRecording(e);
          });
        }
        resumeRecording(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "resumeRecording", "ERROR_INTERACTION_ID_INVALID"), d.AssertUtils.check(E.validateBoolean((s = e.data) === null || s === void 0 ? void 0 : s.autoResumed), "resumeRecording", "autoResumed is not a valid boolean value"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.resumeRecording(e);
          });
        }
        acceptV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "acceptV2", "ERROR_INTERACTION_ID_INVALID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.acceptV2(e);
          });
        }
        endV2(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "endV2", "ERROR_INTERACTION_ID_INVALID"), e.isEndingFromNonPrimary && d.AssertUtils.check(E.validateBoolean(e.isEndingFromNonPrimary), "endV2", "isEndingFromNonPrimary is not a valid boolean value"), !((s = this.SERVICE) === null || s === void 0) && s.aqm.contact.endV2 ? (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.endV2(e) : void 0;
          });
        }
        cancelTaskV2(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "cancelTaskV2", "ERROR_INTERACTION_ID_INVALID"), !((s = this.SERVICE) === null || s === void 0) && s.aqm.contact.cancelTaskV2 ? (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.cancelTaskV2(e) : void 0;
          });
        }
        pauseRecordingV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "pauseRecordingV2", "ERROR_INTERACTION_ID_INVALID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.pauseRecordingV2(e);
          });
        }
        resumeRecordingV2(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "resumeRecordingV2", "ERROR_INTERACTION_ID_INVALID"), d.AssertUtils.check(E.validateBoolean((s = e.data) === null || s === void 0 ? void 0 : s.autoResumed), "resumeRecordingV2", "autoResumed is not a valid boolean value"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.resumeRecordingV2(e);
          });
        }
        wrapupV2(e) {
          var s, w;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "wrapupV2", "ERROR_INTERACTION_ID_INVALID"), E.validateWrapUpV2Payload(e.data, "wrapupV2"), !((s = this.SERVICE) === null || s === void 0) && s.aqm.contact.wrapupV2 ? (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.contact.wrapupV2(e) : void 0;
          });
        }
        consultV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultV2", "ERROR_INTERACTION_ID_INVALID"), E.validateConsultDataV2Payload(e.data, "consultV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultV2(e);
          });
        }
        consultEndV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultEndV2", "ERROR_INTERACTION_ID_INVALID"), d.AssertUtils.check(E.validateBoolean(e.isConsult), "consultEndV2", "isConsult is not a valid boolean value"), e.isSecondaryEpDnAgent && d.AssertUtils.check(E.validateBoolean(e.isSecondaryEpDnAgent), "consultEndV2", "isSecondaryEpDnAgent is not a valid boolean value"), e.queueId && d.AssertUtils.check(E.validateUUID(e.queueId), "consultEndV2", "queueId is not a valid UUID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultEndV2(e);
          });
        }
        consultConferenceV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultConferenceV2", "ERROR_INTERACTION_ID_INVALID"), E.validateConsultConferenceDataV2Payload(e.data, "consultConferenceV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultConferenceV2(e);
          });
        }
        exitConference(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "exitConference", "ERROR_INTERACTION_ID_INVALID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.exitConference(e);
          });
        }
        consultTransferV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "consultTransferV2", "ERROR_INTERACTION_ID_INVALID"), E.validateTransferV2Payload(e.data, "consultTransferV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.consultTransferV2(e);
          });
        }
        blindTransferV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "blindTransferV2", "ERROR_INTERACTION_ID_INVALID"), E.validateTransferV2Payload(e.data, "blindTransferV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.blindTransferV2(e);
          });
        }
        vteamTransferV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "vteamTransferV2", "ERROR_INTERACTION_ID_INVALID"), E.validateTransferV2Payload(e.data, "vteamTransferV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.vteamTransferV2(e);
          });
        }
        buddyAgentsV2(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateBuddyAgentsV2Payload(e.data, "buddyAgentsV2"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.buddyAgentsV2(e);
          });
        }
        dropConferenceParticipant(e) {
          var s;
          return q(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "dropConferenceParticipant", "ERROR_INTERACTION_ID_INVALID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.contact.dropConferenceParticipant(e);
          });
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const be = K(M, "[AgentContact JSAPI] =>"), Ne = K(be, "[AqmServiceEvents: Contact] => ");
      var Ve = ae(322), He = ae.n(Ve), S = ae(497), r = ae.n(S), n = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const u = { agentName: void 0, agentProfileID: void 0, agentSessionId: void 0, idleCode: void 0, teamId: void 0, teamName: void 0, dn: void 0, status: void 0, subStatus: void 0, idleCodes: void 0, wrapupCodes: void 0, outDialRegex: void 0, isOutboundEnabledForTenant: void 0, isOutboundEnabledForAgent: void 0, isEndCallEnabled: void 0, isEndConsultEnabled: void 0, allowConsultToQueue: void 0, isAdhocDialingEnabled: void 0, isAgentAvailableAfterOutdial: void 0, isCampaignManagementEnabled: void 0, agentPersonalStatsEnabled: void 0 };
      class f {
        stateChangeByChannelType(e) {
          throw new Error("Method not implemented.");
        }
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        emit(e, ...s) {
          this.emitter.emit(e, ...s);
        }
        update(e) {
          const s = Object.keys(e).reduce((w, c) => {
            const I = e[c], wt = this.latestData[c];
            return JSON.stringify(I) !== JSON.stringify(wt) && w.push({ name: c, value: I, oldValue: wt }), w;
          }, []);
          s.length && (s.forEach((w) => this.latestData[w.name] = w.value), this.emit("updated", s));
        }
        static getOutdialRegex(e) {
          if (e && e.dialPlanEntity) {
            const s = e.dialPlanEntity.find((w) => w.name === "Any Format");
            if (s) return s.regex;
          }
          return "";
        }
        constructor(e) {
          this.emitter = He()(), this.listeners = /* @__PURE__ */ new Set(), this.teams = [], this.idleCodes = {}, this.latestData = Object.assign({}, u), this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        static findTeamName(e, s) {
          const w = e.find((c) => c.teamId === s);
          return (w == null ? void 0 : w.teamName) || "";
        }
        init(e) {
          return n(this, void 0, void 0, function* () {
            e && (this.SERVICE = e), this.checkService() && (yield this.fetchLatestData(), this.subscribeSelfDataEvents(), this.logger.info("Inited"));
          });
        }
        cleanup() {
          this.unsubscribeSelfDataEvents(), this.removeAllEventListeners(), this.SERVICE = void 0, this.update(Object.assign({}, u)), this.logger.info("Cleaned");
        }
        fetchLatestData() {
          var e, s, w, c, I, wt, St;
          return n(this, void 0, void 0, function* () {
            const Lt = !((e = this.SERVICE) === null || e === void 0) && e.conf.profile ? (s = this.SERVICE) === null || s === void 0 ? void 0 : s.conf.profile : yield (w = this.SERVICE) === null || w === void 0 ? void 0 : w.conf.fetchProfile();
            if (Lt) {
              const { teams: ut, agentName: ot, agentProfileID: ne, defaultDn: pe, agentSubStatus: ve, agentStatus: xe, idleCodes: Ye, wrapupCodes: We, dialPlan: en, isOutboundEnabledForTenant: cn, isOutboundEnabledForAgent: xn, isAdhocDialingEnabled: _n, isEndCallEnabled: Dn, isEndConsultEnabled: Bn, allowConsultToQueue: Le, isAgentAvailableAfterOutdial: o, isCampaignManagementEnabled: h, agentPersonalStatsEnabled: y } = Lt;
              let { idleCode: v } = Lt;
              const _ = pe;
              let B = xe, F = ve;
              if (this.teams = ut, Ye == null || Ye.forEach((ft) => {
                this.idleCodes[ft.id] = { id: ft.id, name: ft.name };
              }), !v || !(!((c = this.SERVICE) === null || c === void 0) && c.conf.isReloginSuccess)) {
                const ft = yield (I = this.SERVICE) === null || I === void 0 ? void 0 : I.aqm.agent.reload();
                ft != null && ft.data && (v = ft.data.auxCodeId !== "0" && ft.data.auxCodeId ? this.idleCodes[ft.data.auxCodeId] : void 0, B = (wt = ft == null ? void 0 : ft.data) === null || wt === void 0 ? void 0 : wt.status, F = (St = ft == null ? void 0 : ft.data) === null || St === void 0 ? void 0 : St.subStatus);
              }
              const tt = f.getOutdialRegex(en);
              this.update({ agentName: ot, agentProfileID: ne, dn: _, status: B, subStatus: F, idleCode: v, idleCodes: Ye, wrapupCodes: We, outDialRegex: tt, isOutboundEnabledForTenant: cn, isOutboundEnabledForAgent: xn, isAdhocDialingEnabled: _n, isEndCallEnabled: Dn, isEndConsultEnabled: Bn, allowConsultToQueue: Le, isAgentAvailableAfterOutdial: o, isCampaignManagementEnabled: h, agentPersonalStatsEnabled: y });
            }
          });
        }
        subscribeSelfDataEvents() {
          var e, s, w, c, I, wt;
          if (this.checkService()) {
            {
              const St = (e = this.SERVICE) === null || e === void 0 ? void 0 : e.aqm.agent.eAgentReloginSuccess.listen(({ data: { agentSessionId: Lt = "", teamId: ut = "", dn: ot = "", status: ne = "", subStatus: pe = "", auxCodeId: ve = "" } }) => {
                const xe = f.findTeamName(this.teams, ut);
                this.update({ agentSessionId: Lt, teamId: ut, teamName: xe, dn: ot, status: ne, subStatus: pe, idleCode: this.idleCodes[ve] });
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
            {
              const St = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.agent.eAgentStationLoginSuccess.listen(({ data: { agentSessionId: Lt = "", teamId: ut = "", status: ot = "", subStatus: ne = "", auxCodeId: pe = "" } }) => {
                const ve = f.findTeamName(this.teams, ut);
                this.update({ agentSessionId: Lt, teamId: ut, teamName: ve, status: ot, subStatus: ne, idleCode: this.idleCodes[pe] });
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
            {
              const St = (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.agent.eAgentStateChangeSuccess.listen(({ data: { agentSessionId: Lt = "", status: ut = "", subStatus: ot = "", auxCodeId: ne = "" } }) => {
                var pe;
                const ve = this.idleCodes ? (pe = this.idleCodes[ne]) === null || pe === void 0 ? void 0 : pe.name : "";
                this.update({ agentSessionId: Lt, status: ut, subStatus: ot, idleCode: { id: ne, name: ve } });
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
            {
              const St = (c = this.SERVICE) === null || c === void 0 ? void 0 : c.aqm.agent.eAgentDNRegistered.listen(({ data: { dn: Lt = "" } }) => {
                this.update({ dn: Lt });
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
            {
              const St = (I = this.SERVICE) === null || I === void 0 ? void 0 : I.aqm.agent.eAgentChannelReloginSuccess.listen((Lt) => {
                this.emit("eAgentChannelReloginSuccess", Lt);
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
            {
              const St = (wt = this.SERVICE) === null || wt === void 0 ? void 0 : wt.aqm.agent.eAgentChannelStateChanged.listen((Lt) => {
                this.emit("eAgentChannelStateChanged", Lt);
              });
              this.listeners.add(() => St == null ? void 0 : St.stopListen());
            }
          }
        }
        unsubscribeSelfDataEvents() {
          this.listeners.forEach((e) => e()), this.listeners.clear();
        }
        stateChange(e) {
          var s, w, c;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.state), "stateChange", "state is null or empty"), d.AssertUtils.check(((s = e.state) === null || s === void 0 ? void 0 : s.toLowerCase()) === "available" || ((w = e.state) === null || w === void 0 ? void 0 : w.toLowerCase()) === "idle", "stateChange", "state is not Available or Idle"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.auxCodeIdArray), "stateChange", "auxCodeIdArray is null or empty"), (c = this.SERVICE) === null || c === void 0 ? void 0 : c.aqm.agent.stateChange({ data: e });
          });
        }
        stateChangeV2(e) {
          var s;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.state), "stateChange", "state is null or empty"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.auxCodeId), "stateChange", "auxCodeId is null or empty"), d.AssertUtils.check(E.validateStateChannelType(e.channelType), "stateChange", "channelType is null or empty or invalid"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.agent.stateChangeV2({ data: e });
            M.info("stateChangeV2 - Service is not available");
          });
        }
        mockOutdialAniList() {
          var e, s;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return ((e = this.SERVICE) === null || e === void 0 ? void 0 : e.aqm.agent.mockOutdialAniList) && ((s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.agent.mockOutdialAniList());
          });
        }
        fetchAddressBooks() {
          var e, s;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return ((e = this.SERVICE) === null || e === void 0 ? void 0 : e.aqm.agent.fetchAddressBooks) && ((s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.agent.fetchAddressBooks());
          });
        }
        changeAgentState(e, s) {
          var w;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e), "changeAgentState", "orgId is not a valid UUID"), E.validateChangeAgentStateType(s, "changeAgentState"), (w = this.SERVICE) === null || w === void 0 ? void 0 : w.aqm.supervisor.changeAgentState({ orgId: e, data: s });
          });
        }
        fetchAgentIdleCodes(e, s) {
          var w;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e), "fetchAgentIdleCodes", "orgId is not a valid UUID"), d.AssertUtils.check(E.validateUUID(s), "fetchAgentIdleCodes", "agentId is not a valid UUID"), yield (w = this.SERVICE) === null || w === void 0 ? void 0 : w.abs.fetchAgentIdleCodes({ orgId: e, agentId: s });
          });
        }
        fetchOrganizationIdleCodes(e) {
          var s;
          return n(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e), "fetchOrganizationIdleCodes", "orgId is not a valid UUID"), yield (s = this.SERVICE) === null || s === void 0 ? void 0 : s.abs.fetchIdleCodes({ orgId: e, accessType: "ALL" });
          });
        }
        addEventListener(e, s) {
          this.checkService() && this.emitter.on(e, s);
        }
        removeEventListener(e, s) {
          this.checkService() && this.emitter.off(e, s);
        }
        removeAllEventListeners() {
          r()(this.emitter);
        }
      }
      const k = K(M, "[AgentInfo JSAPI] =>");
      var P = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const G = 1e3 / 30;
      class z {
        waitUntil(e) {
          return P(this, void 0, void 0, function* () {
            typeof e == "function" && (yield new Promise((s) => setTimeout(s, G)), !e() && (yield this.waitUntil(e)));
          });
        }
        constructor(e) {
          this.initEventType = {}, this.emitter = He()(), this.logger = e.logger, this.agentxSERVICE = e.SERVICE;
        }
        checkService(e) {
          return P(this, void 0, void 0, function* () {
            e ? (e.isInited || (this.logger.warn("SERVICE is not inited. Awaiting it's initAgentxServices(...)..."), yield this.waitUntil(() => e.isInited)), this.logger.info("SERVICE is inited. Continuing..."), this.emit("inited")) : this.logger.error("SERVICE is not defiend...");
          });
        }
        emit(e, ...s) {
          this.emitter.emit(e, ...s);
        }
        init(e) {
          return P(this, void 0, void 0, function* () {
            this.agentxSERVICE ? yield this.checkService(this.agentxSERVICE) : this.logger.error("SERVICE is not defined..."), this.initEventType.widgetName = e.widgetName, this.initEventType.widgetProvider = e.widgetProvider, this.publishEvent("agentx-js-sdk-init");
          });
        }
        registerCrmConnector(e) {
          if (window.self !== window.top) {
            this.initEventType.crmPlatform = e.crmPlatform, this.initEventType.crmConnectorProvider = e.crmConnectorProvider || "Cisco", M.info(`CRm Connector registered through JS SDK... [crmPlatform: ${this.initEventType.crmPlatform}, widgetProvider: ${this.initEventType.crmConnectorProvider}]  `);
            const s = document.referrer;
            M.info("This Desktop is loaded inside an iframe.", s), this.publishEvent("agentx-js-sdk-register-crm-connector");
          } else M.warn("This Desktop is not loaded inside an iframe. CRM Connector is not registered.");
        }
        publishEvent(e) {
          const { crmPlatform: s, crmConnectorProvider: w, widgetName: c, widgetProvider: I } = this.initEventType, wt = Object.assign({}, ...Object.entries(this.initEventType).map(([St, Lt]) => Lt ? { [St]: Lt } : {}));
          this.logger.info("initEvent", wt), M.info(`Publishing js sdk init ${e} event : [widgetName: ${c}, widgetProvider: ${I}, crmPlatform: ${s}, crmConnectorProvider: ${w}]`), this.agentxSERVICE && this.agentxSERVICE.isInited && this.agentxSERVICE.webexMetrics && (M.info(`tracking behavioral for ${e} event `), this.agentxSERVICE.webexMetrics.trackBehavioralEvent(e, Object.assign({}, wt)));
        }
        cleanup() {
          this.agentxSERVICE = void 0, this.emit("cleaned"), this.logger.info("Cleaned");
        }
        get clientLocale() {
          return window.navigator.languages !== void 0 ? window.navigator.languages[0] : window.navigator.language;
        }
        addEventListener(e, s) {
          this.emitter.on(e, s);
        }
        removeEventListener(e, s) {
          this.emitter.off(e, s);
        }
      }
      const X = K(M, "[Config JSAPI] =>");
      var lt = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      class ct {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.dialer, aqmServiceEntityString: "SERVICE.aqm.dialer" }), this.logger.info("Inited"));
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        startOutdial(e) {
          var s;
          return lt(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateDialerTasks(e.data, "startOutdial"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.dialer.startOutdial(e);
          });
        }
        previewCampaignAccept(e) {
          var s;
          return lt(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validatePreviewCampaignPayload(e.data, "previewCampaignAccept"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.dialer.acceptPreviewContact(e);
          });
        }
        previewCampaignSkip(e) {
          var s;
          return lt(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validatePreviewCampaignPayload(e.data, "previewCampaignSkip"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.dialer.skipPreviewContact(e);
          });
        }
        removePreviewContact(e) {
          var s;
          return lt(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validatePreviewCampaignPayload(e.data, "removePreviewContact"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.dialer.removePreviewContact(e);
          });
        }
        updateCadVariables(e) {
          var s, w, c, I, wt;
          return lt(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "updateCadVariables", "interactionId is not valid UUID"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty((w = (s = e.data) === null || s === void 0 ? void 0 : s.attributes) === null || w === void 0 ? void 0 : w.key), "updateCadVariables", "attributes.key is not valid"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty((I = (c = e.data) === null || c === void 0 ? void 0 : c.attributes) === null || I === void 0 ? void 0 : I.value), "updateCadVariables", "attributes.value is not valid"), e.secureCad && e.secureCad.forEach((St) => {
              d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(St), "updateCadVariables", "secureCad is not valid");
            }), e.keyId && d.AssertUtils.check(E.validateUUID(e.keyId), "updateCadVariables", "keyId is not valid UUID"), e.keyVersion && d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.keyVersion), "updateCadVariables", "keyVersion is not valid"), (wt = this.SERVICE) === null || wt === void 0 ? void 0 : wt.aqm.dialer.updateCadVariables(e);
          });
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const Q = K(M, "[Dialer JSAPI] =>"), Jt = K(Q, "[AqmServiceEvents: Dialer] =>");
      class Qt {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("Inited");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        createInstance(e) {
          return d.I18N.createService(e);
        }
        createMixin(e) {
          return d.I18N.createMixin(e);
        }
        get DEFAULT_INIT_OPTIONS() {
          var e;
          if (this.checkService()) return (e = this.SERVICE) === null || e === void 0 ? void 0 : e.i18n.DEFAULT_INIT_OPTIONS;
        }
        getMergedInitOptions(...e) {
          return d.I18N.mergeServiceInitOptions(...e);
        }
      }
      const we = K(M, "[I18N JSAPI] =>");
      class Te {
        constructor(e) {
          this.clientLoggers = /* @__PURE__ */ new Map(), this.logger = e.logger;
        }
        createLogger(e) {
          const s = (0, d.createLogger)(e);
          return this.clientLoggers.set(e, s), this.logger.info(`Client logger created: "${e}"`), s;
        }
        cleanupLogs(e) {
          this.clientLoggers.has(e) && d.Logger.POOL.cleanupPrefixedLogs(e);
        }
        browserDownloadLogsJson(e) {
          this.clientLoggers.has(e) && d.Logger.POOL.browserDownloadPrefixedLogsJson(e);
        }
        browserDownloadLogsText(e) {
          this.clientLoggers.has(e) && d.Logger.POOL.browserDownloadPrefixedLogsText(e);
        }
        getLogsCollection(e) {
          if (this.clientLoggers.has(e)) return d.Logger.POOL.getPrefixedLogsCollection(e);
        }
        getLogsJsonUrl(e) {
          if (this.clientLoggers.has(e)) return d.Logger.POOL.getPrefixedLogsJsonUrl(e);
        }
        getLogsTextUrl(e) {
          if (this.clientLoggers.has(e)) return d.Logger.POOL.getPrefixedLogsTextUrl(e);
        }
      }
      const Fe = K(M, "[Logger JSAPI] =>");
      var de = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      class J {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("[JSAPI] ScheduleCallbackJsApi Initialized");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        fetchByAssigneeAgentId(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (!this.checkService()) return;
            const { page: w, assigneeAgent: c, sortBy: I, sortOrder: wt } = e.data;
            return E.validateFetchByAssigneeAgentIdType(w, c, "fetchByAssigneeAgentId"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.fetchByAssigneeAgentId(w, c, I, wt);
          });
        }
        fetchByCallbackPhoneNumber(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (!this.checkService()) return;
            const { page: w, phoneNumber: c } = e.data;
            return E.validatefetchByCallbackPhoneNumberType(w, c, "fetchByCallbackPhoneNumber"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.fetchByCallbackPhoneNumber(w, c);
          });
        }
        createScheduleCallback(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateCreateOrUpdateScheduleCallbackType(e.data, "createScheduleCallback"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.save(e.data);
          });
        }
        updateCallBackDetails(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateCreateOrUpdateScheduleCallbackType(e.data, "updateCallBackDetails", !0), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.updateCallBackDetails(e.data);
          });
        }
        deleteScheduleCallback(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (!this.checkService()) return;
            const { id: w } = e.data;
            return d.AssertUtils.check(E.validateUUID(w), "deleteScheduleCallback", "id is not a valid UUID"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.deleteScheduleCallback(w);
          });
        }
        getValidCampaignTimes(e) {
          var s;
          return de(this, void 0, void 0, function* () {
            if (!this.checkService()) return;
            const { campaignId: w, agentId: c } = e.data;
            return E.validateGetValidCampaignTimesType(w, c, "getValidCampaignTimes"), (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.scheduleCallback.getValidCampaignTimes(w, c);
          });
        }
      }
      const b = K(M, "[SCHEDULE CALLBACK JSAPI] =>");
      class nt {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.screenpop, aqmServiceEntityString: "SERVICE.aqm.screenpop" }), this.logger.info("Inited"));
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const it = K(M, "[ScreenPop JSAPI] =>"), st = K(it, "[AqmServiceEvents: ScreenPop] =>");
      class ht {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("Inited");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        listenKeyPress(...e) {
          var s;
          this.checkService() && ((s = this.SERVICE) === null || s === void 0 || s.shortcut.event.listenKeyPress(...e));
        }
        listenKeyConflict(...e) {
          var s;
          this.checkService() && ((s = this.SERVICE) === null || s === void 0 || s.shortcut.event.listenKeyConflict(...e));
        }
        listenConflictResolved(...e) {
          var s;
          this.checkService() && ((s = this.SERVICE) === null || s === void 0 || s.shortcut.event.listenConflictResolved(...e));
        }
        register(...e) {
          var s;
          this.checkService() && ((s = this.SERVICE) === null || s === void 0 || s.shortcut.register(...e));
        }
        unregisterKeys(...e) {
          var s;
          this.checkService() && ((s = this.SERVICE) === null || s === void 0 || s.shortcut.unregisterKeys(...e));
        }
        getRegisteredKeys() {
          var e;
          if (this.checkService()) return (e = this.SERVICE) === null || e === void 0 ? void 0 : e.shortcut.getRegisteredKeys();
        }
        get DEFAULT_SHORTCUT_KEYS() {
          var e;
          return (e = this.SERVICE) === null || e === void 0 ? void 0 : e.shortcut.DEFAULT_SHORTCUT_KEYS;
        }
        get MODIFIERS() {
          var e;
          return (e = this.SERVICE) === null || e === void 0 ? void 0 : e.shortcut.MODIFIERS;
        }
        get REGISTERED_KEYS() {
          var e;
          return (e = this.SERVICE) === null || e === void 0 ? void 0 : e.shortcut.REGISTERED_KEYS;
        }
      }
      const It = K(M, "[ShortcutKey JSAPI] =>");
      var T = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const x = 1e3 / 30;
      class U {
        waitUntil(e) {
          return T(this, void 0, void 0, function* () {
            typeof e == "function" && (yield new Promise((s) => setTimeout(s, x)), !e() && (yield this.waitUntil(e)));
          });
        }
        checkService() {
          var e, s, w, c, I;
          return T(this, void 0, void 0, function* () {
            window.wxcc && (!((e = window.wxcc) === null || e === void 0) && e.rtdwc) ? (!((w = (s = window.wxcc) === null || s === void 0 ? void 0 : s.rtdwc) === null || w === void 0) && w.error && (this.logger.error("RTDWC initialization failed. Awaiting Websocket connection to establish", (I = (c = window.wxcc) === null || c === void 0 ? void 0 : c.rtdwc) === null || I === void 0 ? void 0 : I.error), yield this.waitUntil(() => {
              var wt, St;
              return !(!((St = (wt = window.wxcc) === null || wt === void 0 ? void 0 : wt.rtdwc) === null || St === void 0) && St.error);
            })), this.logger.info("Websocket connection established successfully. Continue to subscribe...")) : this.logger.error("issue in loading rtdwc");
          });
        }
        constructor(e) {
          this.emitter = He()(), this.logger = e.logger;
        }
        init() {
          return T(this, void 0, void 0, function* () {
            yield this.checkService(), this.logger.info("rtdwc initialized");
          });
        }
        subscribe({ datasetName: e, update: s, error: w }) {
          var c, I;
          return T(this, void 0, void 0, function* () {
            return yield this.checkService(), (I = (c = window.wxcc) === null || c === void 0 ? void 0 : c.rtdwc) === null || I === void 0 ? void 0 : I.subscribe({ datasetName: e, update: s, error: w });
          });
        }
      }
      const $ = K(M, "[RTDWC JSAPI] =>");
      var H = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      const rt = "interactionId is not valid UUID";
      class Nt {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.supervisor, aqmServiceEntityString: "SERVICE.aqm.supervisor" }), this.logger.info("[JSAPI] Monitoring Inited"));
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        startMonitoring(e) {
          var s, w;
          return H(this, void 0, void 0, function* () {
            if (this.checkService()) return E.validateMonitoringRequest(e.data, "startMonitoring"), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.startMonitoring(e);
          });
        }
        endMonitoring(e) {
          var s, w;
          return H(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "endMonitoring", rt), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.endMonitoring(e);
          });
        }
        holdMonitoring(e) {
          var s, w;
          return H(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "holdMonitoring", rt), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.holdMonitoring(e);
          });
        }
        unHoldMonitoring(e) {
          var s, w;
          return H(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "unHoldMonitoring", rt), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.unHoldMonitoring(e);
          });
        }
        bargeIn(e) {
          var s, w;
          return H(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.interactionId), "bargeIn", rt), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.bargeIn(e);
          });
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const Bt = K(M, "[Call Monitoring JSAPI] =>"), Ee = K(Bt, "[AqmServiceEvents: Call Monitoring] =>");
      class me {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("Inited");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        trackBehavioralEvent(...e) {
          var s;
          if (this.checkService()) try {
            M.info("[webexMetrics Internal JSAPI] => event=trackBehavioralEvent for", e), (s = this.SERVICE) === null || s === void 0 || s.webexMetrics.trackBehavioralEvent(...e);
          } catch (w) {
            M.error("[webexMetrics Internal JSAPI] => event=trackBehavioralEvent Error", w);
          }
        }
      }
      const he = K(M, "[webexMetrics Internal JSAPI] =>");
      var Xe = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      class Yt {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.agent, aqmServiceEntityString: "SERVICE.aqm.agent" }), this.logger.info("[JSAPI] Logout Inited"));
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        desktopLogout(e) {
          var s, w;
          return Xe(this, void 0, void 0, function* () {
            if (!this.checkService()) return;
            const c = yield bn.actions.getTaskMap();
            if ((c == null ? void 0 : c.size) !== 0) throw new Error("You cannot sign out now because you have active conversations. Complete them and try again.");
            return e.data.logoutReason !== void 0 && d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.data.logoutReason), "desktopLogout", "logoutReason is null or empty"), e.data.logoutReason !== void 0 && d.AssertUtils.check(e.data.logoutReason.toLowerCase() === "user requested logout" || e.data.logoutReason.toLowerCase() === "inactivity Logout", "desktopLogout", "logoutReason should be either 'User requested logout' or 'Inactivity Logout'"), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.agent) === null || w === void 0 ? void 0 : w.logout(e);
          });
        }
        signoutAgent(e) {
          var s, w;
          return Xe(this, void 0, void 0, function* () {
            if (this.checkService()) try {
              return M.info("[App:TPW] event=signoutAgentBySupervisor for agent ", e.data.agentId), d.AssertUtils.check(E.validateUUID(e.orgId), "signoutAgent", "orgId is not a valid UUID"), d.AssertUtils.check(E.validateUUID(e.data.agentId), "signoutAgent", "agentId is not a valid UUID"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.data.logoutReason), "signoutAgent", "logoutReason is null or empty"), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.aqm.supervisor) === null || w === void 0 ? void 0 : w.signoutAgent(e);
            } catch (c) {
              return void M.error("[App:TPW] event=signoutAgentBySupervisorFailed for agent ", e.data.agentId, c);
            }
          });
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const $e = K(M, "[Station Logout JSAPI] =>"), on = K($e, "[AqmServiceEvents: Call Monitoring] =>");
      class On {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          var s, w;
          e && (this.SERVICE = e), this.checkService() ? (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.aqm.aiAssistant, aqmServiceEntityString: "SERVICE.aqm.aiAssistant" }), this.logger.info("AiAssistantJsApi inited.")) : (w = (s = this.logger).warn) === null || w === void 0 || w.call(s, "Service check failed");
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned AiAssistantJsApi.");
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const vn = K(M, "[AI Assistant JSAPI] =>"), yn = K(vn, "[AqmServiceEvents: AiAssistant] =>");
      class hn {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.aqmEvents = e.aqmEvents, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          var s, w;
          e && (this.SERVICE = e), this.checkService() ? (this.aqmEvents.init({ aqmServiceEntity: this.SERVICE.dataNotifs.aiAssistant, aqmServiceEntityString: "SERVICE.dataNotifs.aiAssistant" }), this.logger.info("AiAssistantJsApi inited.")) : (w = (s = this.logger).warn) === null || w === void 0 || w.call(s, "Service check failed");
        }
        cleanup() {
          this.aqmEvents.cleanup(), this.SERVICE = void 0, this.logger.info("Cleaned AiAssistantJsApi.");
        }
        addEventListener(e, s) {
          this.checkService() && this.aqmEvents.addEventListener(e, s);
        }
        addOnceEventListener(e, s) {
          this.checkService() && this.aqmEvents.addOnceEventListener(e, s);
        }
        removeEventListener(e, s) {
          this.aqmEvents.removeEventListener(e, s);
        }
        removeOnceEventListener(e, s) {
          this.aqmEvents.removeOnceEventListener(e, s);
        }
        removeAllEventListeners() {
          this.aqmEvents.removeAllEventListeners();
        }
      }
      const Qe = K(M, "[AI Assistant JSAPI] =>"), Ke = K(Qe, "[AqmServiceEvents: AiAssistant] =>");
      var Re = function(p, e, s, w) {
        return new (s || (s = Promise))(function(c, I) {
          function wt(ut) {
            try {
              Lt(w.next(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function St(ut) {
            try {
              Lt(w.throw(ut));
            } catch (ot) {
              I(ot);
            }
          }
          function Lt(ut) {
            var ot;
            ut.done ? c(ut.value) : (ot = ut.value, ot instanceof s ? ot : new s(function(ne) {
              ne(ot);
            })).then(wt, St);
          }
          Lt((w = w.apply(p, [])).next());
        });
      };
      class an {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("[JSAPI] Initialized");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        fetchTasks(e) {
          var s, w;
          return Re(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.startTime), "fetchTasks", "startTime is null or empty"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.endTime), "fetchTasks", "endTime is null or empty"), d.AssertUtils.check(E.validatePropValueNotNullAndEmpty(e.pageNumber), "fetchTasks", "pageNumber is null or empty"), d.AssertUtils.check(E.validateNumber(e.startTime), "fetchTasks", "startTime is not a valid time"), d.AssertUtils.check(E.validateNumber(e.endTime), "fetchTasks", "endTime is not a valid time"), d.AssertUtils.check(E.validateNumber(e.pageNumber), "fetchTasks", "pageNumber is not a valid number"), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.qmw) === null || w === void 0 ? void 0 : w.fetchTasks(e);
          });
        }
        fetchCapture(e) {
          var s, w;
          return Re(this, void 0, void 0, function* () {
            if (this.checkService()) return d.AssertUtils.check(E.validateUUID(e.taskId), "fetchCapture", "taskId is not a valid UUID"), (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.qmw) === null || w === void 0 ? void 0 : w.fetchCapture(e);
          });
        }
      }
      const ln = K(M, "[PI JSAPI] =>");
      class Tn {
        checkService() {
          return this.serviceChecker.check(this.SERVICE);
        }
        constructor(e) {
          this.logger = e.logger, this.serviceChecker = e.serviceChecker;
        }
        init(e) {
          e && (this.SERVICE = e), this.checkService() && this.logger.info("[JSAPI] AgentConfigJsApi Initialized");
        }
        cleanup() {
          this.SERVICE = void 0, this.logger.info("Cleaned");
        }
        fetchPaginatedAuxCodes(e) {
          var s, w, c, I, wt, St;
          return c = this, I = void 0, St = function* () {
            if (this.checkService()) return E.validateAuxCodePayload(e, "fetchPaginatedAuxCodes"), yield (w = (s = this.SERVICE) === null || s === void 0 ? void 0 : s.abs) === null || w === void 0 ? void 0 : w.fetchPaginatedAuxCodes(e);
          }, new ((wt = void 0) || (wt = Promise))(function(Lt, ut) {
            function ot(ve) {
              try {
                pe(St.next(ve));
              } catch (xe) {
                ut(xe);
              }
            }
            function ne(ve) {
              try {
                pe(St.throw(ve));
              } catch (xe) {
                ut(xe);
              }
            }
            function pe(ve) {
              var xe;
              ve.done ? Lt(ve.value) : (xe = ve.value, xe instanceof wt ? xe : new wt(function(Ye) {
                Ye(xe);
              })).then(ot, ne);
            }
            pe((St = St.apply(c, I || [])).next());
          });
        }
      }
      const fn = K(M, "[AGENT CONFIG JSAPI] =>"), bn = (() => {
        AGENTX_SERVICE ? M.info('Found global "AGENTX_SERVICE"!') : M.error('Missed global "AGENTX_SERVICE"...');
        const p = (e = AGENTX_SERVICE, new z({ logger: X, SERVICE: e }));
        var e;
        const s = new Te({ logger: Fe }), w = new ht({ logger: It, serviceChecker: pt({ logger: It }) }), c = new A({ logger: R, serviceChecker: pt({ logger: R }) }), I = new f({ logger: k, serviceChecker: pt({ logger: k }) }), wt = new Oe({ logger: be, serviceChecker: pt({ logger: be }), aqmEvents: C({ logger: Ne }) }), St = new ct({ logger: Q, aqmEvents: C({ logger: Jt }), serviceChecker: pt({ logger: Q }) }), Lt = new Nt({ logger: Bt, aqmEvents: C({ logger: Ee }), serviceChecker: pt({ logger: Bt }) }), ut = new nt({ logger: it, aqmEvents: C({ logger: st }), serviceChecker: pt({ logger: it }) }), ot = new Yt({ logger: $e, aqmEvents: C({ logger: on }), serviceChecker: pt({ logger: $e }) }), ne = new On({ logger: vn, aqmEvents: C({ logger: yn }), serviceChecker: pt({ logger: vn }) }), pe = new hn({ logger: Qe, aqmEvents: C({ logger: Ke }), serviceChecker: pt({ logger: Qe }) }), ve = new J({ logger: b, serviceChecker: pt({ logger: b }) }), xe = new Qt({ logger: we, serviceChecker: pt({ logger: we }) }), Ye = new U({ logger: $ });
        Ye.init();
        const We = new an({ logger: ln, serviceChecker: pt({ logger: ln }) }), en = new Tn({ logger: fn, serviceChecker: pt({ logger: fn }) }), cn = new me({ logger: he, serviceChecker: pt({ logger: he }) });
        return p.addEventListener("inited", () => {
          wt.init(AGENTX_SERVICE), I.init(AGENTX_SERVICE), St.init(AGENTX_SERVICE), Lt.init(AGENTX_SERVICE), ut.init(AGENTX_SERVICE), ot.init(AGENTX_SERVICE), ne.init(AGENTX_SERVICE), pe.init(AGENTX_SERVICE), ve.init(AGENTX_SERVICE), We.init(AGENTX_SERVICE), w.init(AGENTX_SERVICE), c.init(AGENTX_SERVICE), xe.init(AGENTX_SERVICE), en.init(AGENTX_SERVICE), cn.init(AGENTX_SERVICE);
        }), p.addEventListener("cleaned", () => {
          wt.cleanup(), I.cleanup(), St.cleanup(), Lt.cleanup(), ut.cleanup(), ot.cleanup(), ne.cleanup(), pe.cleanup(), ve.cleanup(), We.cleanup(), w.cleanup(), xe.cleanup(), c.cleanup(), en.cleanup(), cn.cleanup();
        }), { config: p, logger: s, monitoring: Lt, shortcutKey: w, actions: c, agentContact: wt, agentStateInfo: I, dialer: St, screenpop: ut, aiAssistant: ne, dataNotifsAiAssistant: pe, i18n: xe, rtdwc: Ye, postInteractions: We, logout: ot, agentConfigJsApi: en, webexMetricsInternal: cn, scheduleCallback: ve };
      })();
    })(), qe;
  })());
})(Mi);
var Ce = Mi.exports;
const Dt = Ce.Desktop.logger.createLogger("cisco-conference-speed-dial");
class ns extends HTMLElement {
  constructor() {
    super();
    Gn(this, "buttonStateMap", null);
    Gn(this, "initialized", !1);
    Gn(this, "lastButtonPressTime", 0);
    Gn(this, "latestCallState", "unknown");
    Dt.info("lee-health-wxcc-consult-buttons version 1.0"), Dt.info("JS Step 1 - attachShadow"), this.attachShadow({ mode: "open" }), Dt.debug("Requesting Button Map Update from background process in constructor... ");
  }
  async connectedCallback() {
    Dt.debug("*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Connected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"), Dt.debug("connectedCallback in UI Widget"), this.initialized === !1 ? (Dt.debug("Not previously initialized - doing Desktop.config.init()"), await Ce.Desktop.config.init()) : (Dt.debug("Previously initialized - skipping Desktop.config.init()"), this.removeButtonPressListener()), Dt.debug("Removing Old Event Listeners"), this.removeListeners(), Dt.debug("Initializing Event Listeners"), this.initListeners(), Dt.debug("Adding Button Press Listener"), this.addButtonPressListener(), Dt.debug("Getting Call State"), this.latestCallState = await this.getCallState(), Dt.debug("Rendering template"), this.render(), this.initialized = !0;
  }
  async disconnectedCallback() {
    Dt.debug("*/*/*/*/*/*/*/*/*/*/*/*/*/*/ Disconnected Callback */*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"), this.removeButtonPressListener(), this.removeListeners(), Dt.debug("disconnectedCallback in UI Widget");
  }
  initListeners() {
    Dt.info("Adding WebexCC Event Listeners"), Ce.Desktop.agentContact.addEventListener("eAgentContact", (Rt) => this.logEvent(Rt, "eAgentContact")), Ce.Desktop.agentContact.addEventListener("eAgentContactAssigned", (Rt) => this.logEvent(Rt, "eAgentContactAssigned")), Ce.Desktop.agentContact.addEventListener("eAgentContactAssignFailed", (Rt) => this.logEvent(Rt, "eAgentContactAssignFailed")), Ce.Desktop.agentContact.addEventListener("eAgentContactEnded", (Rt) => this.logEvent(Rt, "eAgentContactEnded")), Ce.Desktop.agentContact.addEventListener("eAgentContactWrappedUp", (Rt) => this.logEvent(Rt, "eAgentContactWrappedUp")), Ce.Desktop.agentContact.addEventListener("eAgentOfferContact", (Rt) => this.logEvent(Rt, "eAgentOfferContact")), Ce.Desktop.agentContact.addEventListener("eAgentOfferContactRona", (Rt) => this.logEvent(Rt, "eAgentOfferContactRona")), Ce.Desktop.agentContact.addEventListener("eAgentOfferConsult", (Rt) => this.logEvent(Rt, "eAgentOfferConsult")), Ce.Desktop.agentContact.addEventListener("eAgentWrapup", (Rt) => this.logEvent(Rt, "eAgentWrapup")), Ce.Desktop.agentContact.addEventListener("eAgentContactHeld", (Rt) => this.logEvent(Rt, "eAgentContactHeld")), Ce.Desktop.agentContact.addEventListener("eAgentContactUnHeld", (Rt) => this.logEvent(Rt, "eAgentContactUnHeld")), Ce.Desktop.agentContact.addEventListener("eConsultTransfer", (Rt) => this.logEvent(Rt, "eConsultTransfer")), Ce.Desktop.agentContact.addEventListener("eAgentConsultCreated", (Rt) => this.logEvent(Rt, "eAgentConsultCreated")), Ce.Desktop.agentContact.addEventListener("eAgentConsultConferenced", (Rt) => this.logEvent(Rt, "eAgentConsultConferenced")), Ce.Desktop.agentContact.addEventListener("eAgentConsultEnded", (Rt) => this.logEvent(Rt, "eAgentConsultEnded")), Ce.Desktop.agentContact.addEventListener("eAgentConsultConferenceEnded", (Rt) => this.logEvent(Rt, "eAgentConsultConferenceEnded")), Ce.Desktop.agentContact.addEventListener("eAgentConsulting", (Rt) => this.logEvent(Rt, "eAgentConsulting")), Ce.Desktop.agentContact.addEventListener("eAgentConsultFailed", (Rt) => this.logEvent(Rt, "eAgentConsultFailed")), Ce.Desktop.agentContact.addEventListener("eAgentConsultEndFailed", (Rt) => this.logEvent(Rt, "eAgentConsultEndFailed")), Ce.Desktop.agentContact.addEventListener("eAgentConsultConferenceEndFailed", (Rt) => this.logEvent(Rt, "eAgentConsultConferenceEndFailed")), Ce.Desktop.agentContact.addEventListener("eParticipantLeftConference", (Rt) => this.logEvent(Rt, "eParticipantLeftConference")), Ce.Desktop.agentContact.addEventListener("eParticipantJoinedConference", (Rt) => this.logEvent(Rt, "eParticipantJoinedConference")), Ce.Desktop.agentContact.addEventListener("eContactUpdated", (Rt) => this.logEvent(Rt, "eContactUpdated"));
  }
  async logEvent(Rt, fe) {
    Dt.debug("Start logEvent"), Dt.debug(`************** LOGGING EVENT - ${fe} ****************`), Dt.debug(Rt);
    let ke = await this.getCallStateFromEvent(Rt);
    ke === "terminated" && (ke = await this.getCallState()), Dt.debug("Updating Buttons"), await this.updateButtons(ke), Dt.debug("*********************************************");
  }
  removeListeners() {
    Dt.info("Removing WebexCC Event Listeners"), Ce.Desktop.agentContact.removeAllEventListeners();
  }
  async getCallState() {
    const Rt = this.details, fe = await this.getInteractionId();
    Dt.debug(`Getting Call State for interaction id ${fe}`);
    let ke = "unknown", _e = "unknown";
    for (const [ae, qe] of Object.entries(Rt.toJSON()))
      if (Dt.debug("getCallState - Dumping Interaction Data for interaction_id " + ae), Dt.debug(qe), ae === fe) {
        Dt.debug(`Found Interaction Data for id ${fe}`);
        const d = qe.interaction.owner;
        switch (Dt.debug(`interaction_owner is ${d}`), qe.interaction.isTerminated === !0 ? ke = "terminated" : d === null ? ke = "wrapup" : ke = qe.interaction.state, _e = qe.type, Dt.debug("interaction_type = " + _e), _e) {
          case "AgentConsultCreated":
            ke = "consulting";
            break;
          case "AgentConsulting":
            ke = "consulting";
            break;
          case "AgentConsultConferenced":
            qe.interaction.participants[d].consultState === "consultInitiated" && (ke = "consulting");
            break;
          case "AgentWrapup":
            ke = "wrapup";
            break;
        }
      }
    return Dt.debug(`*********** Returning call_state: ${ke}`), ke;
  }
  async getCallStateFromEvent(Rt) {
    const fe = await this.getInteractionId(), ke = this.agent_id, _e = this.selected_task;
    Dt.debug("call_interaction_id = " + fe), Dt.debug("agent id = " + ke), Dt.debug("selected task dump:"), Dt.debug(_e);
    let ae = "unknown";
    if (fe === void 0)
      Dt.debug("Getting Call State From Event - No call interaction id found - returning unknown");
    else {
      Dt.debug(`Getting Call State From Event for interaction id ${fe}`);
      let qe = "unknown";
      Dt.debug("getCallStateFromEvent - Dumping Interaction Data for interaction_id " + fe);
      let d = Rt.data.interaction;
      Dt.debug(d);
      const M = d.owner;
      switch (Dt.debug(`interaction_owner is ${M}`), Dt.debug(`isTerminated = ${d.isTerminated}`), Dt.debug(`state = ${d.state}`), Dt.debug("relationshipType = " + d.callProcessingDetails.relationshipType), d.isTerminated === !0 ? ae = "terminated" : M === null ? ae = "wrapup" : ae = d.state, Dt.debug("provisional call state = " + ae), qe = Rt.data.type, Dt.debug("interaction_type = " + qe), qe) {
        case "AgentConsultCreated":
          ae = "consulting";
          break;
        case "AgentConsulting":
          ae = "consulting";
          break;
        case "AgentWrapup":
        case "AgentWrappedUp":
          ae = "wrapup";
          break;
      }
      for (const [K, Pt] of Object.entries(d.participants))
        Dt.debug("participant id = " + K), Dt.debug("consultState = " + Pt.consultState), Dt.debug("participant_data = " + Pt), Pt.hasLeft === !1 && Pt.isWrapUp === !1 && (Dt.debug("participant is still in call"), (Pt.consultState === "consulting" || Pt.consultState === "consultInitiated") && (Dt.debug("participant is consulting"), ae = "consulting"));
      d.state === "connected" && d.callProcessingDetails.relationshipType === "consult" && Rt.data.reason !== "Consult_Transfer_To_EpDn" && (ae = "consulting");
    }
    return Dt.debug(`*********** Returning call_state: ${ae}`), ae;
  }
  getEmptyButtonMap() {
    return {
      button1: {
        display: "none",
        disabled: !0
      },
      button2: {
        display: "none",
        disabled: !0
      },
      button3: {
        display: "none",
        disabled: !0
      }
    };
  }
  addButtonPressListener() {
    document.documentElement.addEventListener("uiButtonPressEvent", this.buttonListener);
  }
  removeButtonPressListener() {
    document.documentElement.removeEventListener("uiButtonPressEvent", this.buttonListener);
  }
  async getInteractionId() {
    const Rt = await Ce.Desktop.actions.getTaskMap();
    for (const fe of Rt)
      return fe[1].interactionId;
  }
  async consultToDN(Rt) {
    Dt.debug("consultToDN started");
    let fe = !0;
    try {
      fe = this.holdParticipants;
    } catch {
      Dt.error("Error getting holdParticipants from config, defaulting to true.");
    }
    fe = !0, Dt.debug("Hold Participants Setting: " + fe);
    let ke = await this.getInteractionId(), _e = await Ce.Desktop.agentContact.consult({
      interactionId: ke,
      data: {
        destinationType: "DN",
        destAgentId: Rt
      }
    });
    return Dt.debug("consultToDN response: " + JSON.stringify(_e)), _e;
  }
  async processButtonPress(Rt, fe) {
    switch (Dt.debug(`Sending button click event for button ${Rt} with payload ${fe}`), Dt.debug(`button name: ${Rt}, payload = ${fe}`), Rt) {
      case "button1":
      case "button2":
      case "button3":
        let ke = Date.now(), _e = ke - this.lastButtonPressTime;
        if (this.lastButtonPressTime = ke, _e > 5e3) {
          Dt.debug(`Processing button press (${Rt}) - ${_e}ms since last button press.`);
          let ae = await this.consultToDN(fe);
          Dt.debug(ae);
        } else
          Dt.error(`Ignoring button press (${Rt}) - only ${_e}ms since last button press.`);
        break;
    }
  }
  showConsultModal() {
    this.shadowRoot.getElementById("custom-interaction-control-transfer-modal").style.display = "inline";
  }
  closeConsultModal() {
    this.shadowRoot.getElementById("custom-interaction-control-transfer-modal").style.display = "none";
  }
  //Render on the DOM
  render() {
    Dt.debug("JS Step 2 - create a const template");
    const Rt = document.createElement("template");
    Dt.debug("JS Step 3 - attach template to innerHTML");
    let fe = "", ke = !1, _e = !1, ae = !1;
    Dt.debug("Attaching buttons to template"), this.button1_name !== "" && this.button1_dn !== "" && (Dt.debug("Attaching Button 1"), fe += `<div class="interactionButtonHolder" id="button1_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button1_name}" disabled=""><md-button id='button1' arialabel="${this.button1_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button1_name}</span></md-button></md-tooltip></div>`, ke = !0), this.button2_name !== "" && this.button2_dn !== "" && (Dt.debug("Attaching Button 2"), fe += `<div class="interactionButtonHolder" id="button2_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button2_name}" disabled=""><md-button id='button2' arialabel="${this.button2_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button2_name}</span></md-button></md-tooltip></div>`, _e = !0), this.button3_name !== "" && this.button3_dn !== "" && (Dt.debug("Attaching Button 3"), fe += `<div class="interactionButtonHolder" id="button3_div"><md-tooltip class="md-tooltip" slot="false" placement="bottom" message="${this.button3_name}" disabled=""><md-button id='button3' arialabel="${this.button3_name}" ariahaspopup="true" size="40" maxwidth="160px" variant="secondary"><md-icon slot="icon" name="icon-headset_16"></md-icon><span class="interactionButtonText" slot="text">${this.button3_name}</span></md-button></md-tooltip></div>`, ae = !0), Rt.innerHTML = `
        <style>
            .container {
                background: var(--back, inherit)
            }
            .cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
                grid-auto-rows: auto;
                grid-gap: 1rem;
            }
                h1 {
                text-align: center;
                width: 100%;
                }
                /* User Card */
                .card {
                    border: 2px solid #BEBEBE;
                    border-radius: 10px;
                    padding: .5rem;
                    min-height: 150px;
                    max-height: 300px;
                    overflow: scroll;
                }
                img {
                    margin-top: 15px;
                    border-radius: 10px;
                    display: block;
                }		
                .hide {
                    display: none;
                }
                .show {
                    font-size: large;
                    padding-left:0;
                    display: block;
                }
                .btn {
                    border: none;
                    height: 36px;
                    width: 160px;
                    padding: 6px 18px;
                    border-radius: 20px;
                    background: #007AA3;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .btn:hover{
                    background: #005E7D;
                    opacity: 1;
                }
                .italic{
                    font-style: oblique;
                    text-decoration: underline #FF3028;
                }
                .input{
                
                }
                .interactionButtonHolder {
                    display: none;
                    margin-left: 0.3125rem;
                }
                .md-button {
                    margin-top: 4px;
                    margin-left: 4px;
                }
                .md-button--40 {
                    margin-top: 4px;
                    margin-left: 4px;
                }
                .btn-group {
                    display: block;
                    margin-top: 4px;
                    padding: 4px;
                    /*justify-content: flex-end;*/
                }
                .interactionButtonText {
                    font-size: 14px;
                }
                                
                :host-context(.hiddenIcons) .cards {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-auto-rows: auto;
                }
                :host-context(.hiddenIcons) .md-tooltip {
                    margin-bottom: 10px;
                }


                
        </style>
        <div class="container">
            <div class="cards">
                <div class="interaction-button-container">
                    <div class="btn-group">
                      ${fe}
                    </div>
                </div>
            </div>
        </div>
        <div id="custom-interaction-control-transfer-modal" style="display: none;">
            <div class="s-custom-cms-ui">
              <style id="direflow_styles" type="text/css">.s-custom-cms-ui * {
                 --sandbox-bg-color-default: #e5e5e5; --border-width: 1px; --md-primary-bg-color-default: #ffffff; --md-secondary-bg-color-default: #f7f7f7; --md-secondary-white-bg-color-default: #ffffff; --md-tertiary-bg-color-default: #ededed; --md-quaternary-bg-color-default: #dedede; --defult-button-size: 36px; --md-primary-text-color-default: #121212; --md-secondary-text-color-default: #545454; --md-primary-seperator-color-default: #cccccc; --md-alert-warning-bg-color: #ffecc2; --border: 1px solid var(--md-primary-seperator-color, --md-primary-seperator-color-default); --blue-border: var(--border-width) solid var(--link-color); --red-border: var(--border-width) solid var(--red-color); --interaction-border-bottom: 8px solid var(--gray-30-color); --email-chat-min-width: 600px; --interaction-control-height: 67px; --top-header-height: 65px; --font-size-xlarge: 20px; --font-size-large: 16px; --font-size-medium: 14px; --font-size-small: 12px; --font-size-xsmall: 10px; --space-token-cardinal: 5px; --space-token-even: 2px; --padding-16: 16px; --padding-14: 14px; --padding-12: 12px; --padding-10: 10px; --padding-3: 3px; --conference-button-padding: 4px 8px 4px 4px; --left-spacing-16: 16px; --left-spacing-40: 40px; --margin-8: 8px; --margin-375rem: 0.375rem; --flex-only-two-columns: 50%; --font-weight-normal: 400; --font-weight-bold: 600; --font-family: 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-light: 'CiscoSansTT Light', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-bold: 'CiscoSansTT Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif; --font-family-icons: 'momentum-ui-icons', sans-serif; --red-color: #ff5c4a; --orange-color: #d67f04; --red-60-color: #d93829; --red-70-color: #a12512; --red-20-color: #ffe1d9; --white-color: #fff; --black-color: #000; --blue-20-color: #b8f2ff; --link-color: #00a0d1; --grey-border: #f2f2f2; --grey-color: #d2d5d6; --green-color: #24ab31; --green-05-color: #edfaf4; --green-10-color: #befade; --green-20-color: #bcf7bf; --green-30-color: #31e88c; --gray-100-color: #171b1f; --gray-80-color: #3b3b3b; --gray-70-color: #535759; --gray-30-color: #d2d5d6; --gray-20-color: #f7f7f7; --gray-10-color: #f2f4f5; --background-color: transparent; --slate-60-color: #6f739e; --sub-header: #535759; --blue-05-color: #e6fbff; --blue-70-color: #005e7d; --brand-60-color: #007ea8; --disabled-lightui-color: #ededed; --disabled-text-color: #b2b2b2; --highlight-color: #737678; --violet-20-color: #f0e3fc; --yellow-20-color: #ffe6b3; --light-green-color: #44cf50; --dark-green-color: #03612c; --disabled-color: #e6e7e7; --red-30-color: #ffc7ba; --gold-color: #7d4705; --border-radius-small: 4px; --border-radius-medium: 8px; --border-radius-large: 10px; --border-radius-medium-top: 8px 8px 0 0; --border-radius-medium-bottom: 0 0 8px 8px; --common-box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.18), 0px 2px 4px rgba(0, 0, 0, 0.16); --simple-box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08); --focused-shadow: 0 0 4px 2px rgba(0, 160, 209, 0.75); --focused-momentum-shadow: 0 0 0 0.125rem var(--button-focus-ring-color, #007aa3); --focused-list-shadow: 0 0 0 0.125rem var(--button-focus-ring-color, #007aa3) inset; --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1); --default-animation-duration: 300ms; --quick-animation-duration: 150ms; --animation-slideIn: slideIn var(--default-animation-duration) var(--ease-in-out-quint) forwards; --animation-slideOut: slideOut var(--default-animation-duration) var(--ease-in-out-quint) forwards; --animation-fadeIn: fadeIn var(--quick-animation-duration) linear forwards; box-sizing: border-box;
                 }
                 @keyframes slideIn {
                     from {
                         transform: translatex(0); 
                     }
                     to {
                        transform: translatex(-100%); 
                    }
                 }
                 @keyframes slideOut {
                    from {
                        transform: translatex(-100%); 
                    }
                    to {
                        transform: translatex(0); 
                    }
                 }
                 @keyframes fadeIn {
                     from {
                        opacity: 0; 
                     }
                     to {
                        opacity: 1; 
                     }
                 }
                 .s-custom-cms-ui 
                 * {
                    --dropdown-width: 510px; --dropdown-max-height: 220px; --dropdown-max-height-connector-view: 255px; --addressbook-max-height-connector-view: 238px; --addressbook-two-row-max-height-connector-view: 204px; --queue-dropdown-max-height: 290px; --queue-dropdown-min-height: 110px; --modal-height: 420px; --modal-radio-height: 24px; --cancel-ctq-container-maxwidth: 500px; --padding-icon-right: 0.5rem; --transfer-modal-content-height: 220px; --queue-dropdown-item: 36px; --dropdown-height: 48px; --menu-overlay-max-height: 325px; --modal-size: 490px; --organization-list-item-max-width: 375px;
                 }
                 .s-custom-cms-ui  .queueDropdown {
                    width: var(--dropdown-width);
                 }
                 .s-custom-cms-ui  .queueDropdown-tabbed {
                    height: 35px;
                 }
                 .s-custom-cms-ui  .queueDropdown::part(overlay) {
                    width: 100%; transform: none; top: calc(100% + 0.2rem);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(overlay-content) {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .epdn-addressbook {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .entry-point-tab {
                    border-bottom: 2px solid var(--md-separator-primary); width: 100%; display: inline-flex; height: 3rem; min-height: 3rem; align-items: center; padding: 0.3rem 1rem; color: var(--md-textColor-secondary);
                 }
                 .s-custom-cms-ui  .entry-point-tab > span {
                    margin-top: 5px;
                 }
                 .s-custom-cms-ui  .no-options {
                    width: 100%; display: inline-flex; height: 3rem; min-height: 3rem; align-items: center; padding: 0.3rem 1rem; color: var(--md-textColor-secondary);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-options) {
                    line-height: 21px; max-height: var(--queue-dropdown-max-height);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-option) {
                    max-height: var(--dropdown-height);
                 }
                 .s-custom-cms-ui  .queueDropdown::part(combobox-option) .select-label span {
                    margin-left: 0; margin-right: 0;
                 }
                 .s-custom-cms-ui  .highlighted-part {
                    margin-left: 4px !important;
                 }
                 .s-custom-cms-ui  .modal-container .md-event-overlay__children {
                    height: auto; max-height: var(--dropdown-max-height); width: var(--dropdown-width);
                 }
                 .s-custom-cms-ui  .md-modal__header {
                    padding-bottom: 0.75rem;
                 }
                 .s-custom-cms-ui  .my-radio-group md-radiogroup .radioClass {
                    box-sizing: border-box;
                 }
                 .s-custom-cms-ui  .modal-body-class.list-queue.list-organization #dailNumberId, .s-custom-cms-ui 
                 .modal-body-class.list-queue.list-organization #organizationUsers {
                    margin-top: 9px;
                 }
                 .s-custom-cms-ui  .my-radio-group md-radiogroup::part(radio-group-container) {
                    width: 100%; justify-content: space-between;
                 }
                 .s-custom-cms-ui  .modal-body-class.list-queue:not(.list-organization):not(.radio-two-row):not(.list-dialnumber) .my-radio-group md-radiogroup::part(radio-group-container), .s-custom-cms-ui 
                 .modal-body-class:not(.list-organization):not(.list-queue) .my-radio-group md-radiogroup::part(radio-group-container), .s-custom-cms-ui 
                 .modal-body-class.radio-two-row .my-radio-group md-radiogroup::part(radio-group-container) {
                    flex-flow: wrap; display: grid; grid-template-columns: repeat(2, 1fr);
                 }
                 .s-custom-cms-ui  .org-search-input::part(md-input-container) {
                    margin-bottom: 0;
                 }
                 .s-custom-cms-ui  .modal-container > .md-modal__content {
                    min-height: var(--modal-size);
                 }
                 .s-custom-cms-ui  .my-radio-group .md-radio-group, .s-custom-cms-ui 
                 .my-radio-group .md-radio {
                    display: flex;
                 }
                 .s-custom-cms-ui  .my-radio-group {
                    padding-top: calc(var(--space-token-even) * 6);
                 }
                 .s-custom-cms-ui  .agentAction-container {
                    margin-top: 0.75rem;
                 }
                 .s-custom-cms-ui  md-modal::part(modal-body) {
                    overflow: visible;
                 }
                 .s-custom-cms-ui  .modal-container .md-label.md-radio__label > span {
                    height: var(--modal-radio-height); margin-right: calc(var(--space-token-even) * 36);
                 }
                 .s-custom-cms-ui  .modal-container .md-input-container .input-error-class {
                    border-color: var(--red-color); border-radius: 0; box-shadow: var(--focused-shadow); display: inline-block;
                 }
                 .s-custom-cms-ui  .actionMessage {
                    display: flex; font-size: var(--font-size-small); margin-top: 0.5rem;
                 }
                 .s-custom-cms-ui  .agentAction-error-container {
                    color: var(--md-alert-error-text-color, --red-70-color);
                 }
                 .s-custom-cms-ui  .agentAction-warning-container {
                    color: var(--md-alert-warning-text-color, --yellow-70-color);
                 }
                 .s-custom-cms-ui  .cancelCtq-info-container {
                    color: var(--md-secondary-text-color-default); display: flex; flex-direction: row; font-size: var(--font-size-small); margin-top: 0.5rem; max-width: var(--cancel-ctq-container-maxwidth);
                 }
                 .s-custom-cms-ui  .agentAction-error-icon {
                    color: var(--red-70-color); padding-right: 0.5rem;
                 }
                 .s-custom-cms-ui  .cancelCtq-info-icon {
                    padding-right: var(--padding-icon-right);
                 }
                 .s-custom-cms-ui  md-radio.hideClass {
                    display: none !important; margin: 0; /** due to momentum display: inline !important adding the field below to hide the radio group */ visibility: hidden; width: 0; position: absolute;
                 }
                 .s-custom-cms-ui  .cancelCtq-spinner {
                    padding-right: calc(var(--space-token-even) * 4); padding-top: calc(var(--space-token-even) * 2);
                 }
                 .s-custom-cms-ui  .cancelCtq-link {
                    text-decoration: underline;
                 }
                 .s-custom-cms-ui  .transfer-modal-btn {
                    margin-left: 0.75rem;
                 }
                 .s-custom-cms-ui  #dailNumberId {
                    margin-right: 0;
                 }
                 .s-custom-cms-ui  .modal-body-class {
                    min-height: var(--transfer-modal-content-height);
                 }
                 .s-custom-cms-ui  .transfer-modal-footer {
                    display: flex; flex-direction: row; justify-content: flex-end; width: 100%;
                 }
                 .s-custom-cms-ui  .available {
                    color: var(--md-presence-active-bg-color);
                 }
                 .s-custom-cms-ui  .un-available {
                    color: var(--md-presence-away-bg-color);
                 }
                 .s-custom-cms-ui  .align {
                    vertical-align: middle;
                 }
                 .s-custom-cms-ui  .transfer-modal-search-container {
                    display: flex;
                 }
                 .s-custom-cms-ui  .transfer-modal-search-container.organization {
                    flex-direction: column;
                 }
                 .s-custom-cms-ui  .org-search-container {
                    display: flex;
                 }
                 .s-custom-cms-ui  .org-search-container md-input {
                    width: 100%;
                 }
                 .s-custom-cms-ui  .refresh-spinner {
                    margin: auto calc(var(--space-token-even) * 3) auto calc(var(--space-token-even) * 7); width: calc(var(--space-token-even) * 14);
                 }
                 .s-custom-cms-ui  .refresh-list-tooltip {
                    margin-left: calc(var(--space-token-even) * 4);
                 }
                 .s-custom-cms-ui  .refresh-list-button {
                    height: calc(var(--space-token-even) * 14); width: calc(var(--space-token-even) * 14);
                 }
                 .s-custom-cms-ui  .address-list-item {
                    align-items: center; display: grid; grid-template-columns: 0fr 1fr 0fr; width: 100%;
                 }
                 .s-custom-cms-ui  .address-list-item-detail {
                    padding: 1px calc(var(--space-token-even) * 5);
                 }
                 .s-custom-cms-ui  .address-list-item-detail .address-name, .s-custom-cms-ui 
                 .address-dn {
                    font-size: 14px; max-width: var(--adr-name-width); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
                 }
                 .s-custom-cms-ui  .address-list-item-detail .address-dn {
                    color: var(--md-secondary-text-color); font-size: var(--font-size-small);
                 }
                 .s-custom-cms-ui  .organization-users-list .address-list-item-detail .address-dn {
                    max-width: var(--organization-list-item-max-width);
                 }
                 .s-custom-cms-ui  .dnDropdown::part(combobox-option) {
                    padding-bottom: var(--space-token-even); padding-top: var(--space-token-even);
                 }
                 .s-custom-cms-ui  .radioLabel {
                    margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 88px;
                 }
                 .s-custom-cms-ui  .transfer-modal-btn-primary {
                     background: #007aa3;        
                 }
                 .s-custom-cms-ui  .my-radio-group .radioClass {
                     margin-right: 0; width: fit-content;
                 }
                 .s-custom-cms-ui  .organization-users-list {
                    margin-top: 0.25rem;
                 }
                 .s-custom-cms-ui  .organization-users-list.disabled {
                    opacity: 0.8; pointer-events: none;
                 }
                 .s-custom-cms-ui  .organization-auth-error, .s-custom-cms-ui 
                 .organization-auth-error md-icon, .s-custom-cms-ui 
                 .organization-auth-error md-link::part(link) {
                    font-size: var(--font-size-small); color: var(--link-inline); display: flex; align-items: center;
                 }
                 .s-custom-cms-ui  .organization-auth-error .auth-error-message {
                    margin: 0 calc(var(--space-token-even) * 4);
                 }
                 .s-custom-cms-ui  .organization-users-list .address-book-increased-limit-list .address-book-increased-limit-list-item, .s-custom-cms-ui 
                 .organization-users-list .address-book-increased-limit-list .infinite-scroll-error {
                    padding-left: 0.25rem !important;
                 }
                 @media only screen and (min-width: 41em) {
                     .s-custom-cms-ui  md-modal::part(modal-container) {
                         width: var(--modal-size); 
                     }
                     .s-custom-cms-ui  md-modal::part(modal-content) {
                         height: var(--modal-size); 
                     }
                 }
                 @media screen and (max-width: 640px) and (max-height: 575px) {
                     .s-custom-cms-ui  .radio-two-row .queueDropdown::part(combobox-options) {
                         max-height: var(--dropdown-max-height-connector-view) !important; 
                     }
                     .s-custom-cms-ui  .epdn-addressbook .address-book-increased-limit-list .fixed-size-list 
                     {
                         max-height: var(--addressbook-max-height-connector-view) !important; 
                     }
                     .s-custom-cms-ui  .radio-two-row .epdn-addressbook .address-book-increased-limit-list .fixed-size-list {
                        max-height: var(--addressbook-two-row-max-height-connector-view) !important; 
                     }
                 }
              </style>
            </div>
        </div>        
        `, Dt.debug("JS Step 4 - attach to document"), this.shadowRoot.appendChild(Rt.content.cloneNode(!0)), this.updateButtons = (qe) => {
      Dt.debug(`Creating Update Buttons Event for call state ${qe}`);
      let d = this.getEmptyButtonMap();
      switch (qe) {
        case "connected":
          d.button1.display = "inline", d.button2.display = "inline", d.button3.display = "inline", d.button1.disabled = !1, d.button2.disabled = !1, d.button3.disabled = !1;
          break;
        case "consult":
          d.button1.display = "inline", d.button2.display = "inline", d.button3.display = "inline", d.button1.disabled = !0, d.button2.disabled = !0, d.button3.disabled = !0;
          break;
        case "consulting":
          d.button1.display = "inline", d.button2.display = "inline", d.button3.display = "inline", d.button1.disabled = !0, d.button2.disabled = !0, d.button3.disabled = !0;
          break;
        case "conference":
          d.button1.display = "inline", d.button2.display = "inline", d.button3.display = "inline", d.button1.disabled = !1, d.button2.disabled = !1, d.button3.disabled = !1;
          break;
        default:
          d.button1.display = "none", d.button2.display = "none", d.button3.display = "none", d.button1.disabled = !0, d.button2.disabled = !0, d.button3.disabled = !0;
          break;
      }
      const M = this.shadowRoot.getElementById("button1"), K = this.shadowRoot.getElementById("button2"), Pt = this.shadowRoot.getElementById("button3"), pt = this.shadowRoot.getElementById("button1_div"), _t = this.shadowRoot.getElementById("button2_div"), Kt = this.shadowRoot.getElementById("button3_div");
      M !== null && (Dt.debug("Setting Button 1 State"), pt.style.display = d.button1.display, M.disabled = d.button1.disabled), K !== null && (Dt.debug("Setting Button 2 State"), _t.style.display = d.button2.display, K.disabled = d.button2.disabled), Pt !== null && (Dt.debug("Setting Button 3 State"), Kt.style.display = d.button3.display, Pt.disabled = d.button3.disabled), Dt.debug("Caching buttonStateMap"), this.buttonStateMap = d;
    }, ke && this.shadowRoot.getElementById("button1").addEventListener("click", async (qe) => {
      this.shadowRoot.getElementById("button1").disabled === !1 ? (Dt.debug("Button 1 Pressed. Disabling Buttons."), ke && (this.shadowRoot.getElementById("button1").disabled = !0), _e && (this.shadowRoot.getElementById("button2").disabled = !0), ae && (this.shadowRoot.getElementById("button3").disabled = !0), await this.processButtonPress("button1", this.button1_dn)) : Dt.debug("Button 1 is disabled. Ignoring click event.");
    }), _e && this.shadowRoot.getElementById("button2").addEventListener("click", async (qe) => {
      this.shadowRoot.getElementById("button2").disabled === !1 ? (Dt.debug("Button 2 Pressed. Disabling Buttons."), ke && (this.shadowRoot.getElementById("button1").disabled = !0), _e && (this.shadowRoot.getElementById("button2").disabled = !0), ae && (this.shadowRoot.getElementById("button3").disabled = !0), await this.processButtonPress("button2", this.button2_dn)) : Dt.debug("Button 2 is disabled. Ignoring click event.");
    }), ae && this.shadowRoot.getElementById("button3").addEventListener("click", async (qe) => {
      this.shadowRoot.getElementById("button3").disabled === !1 ? (Dt.debug("Button 3 Pressed. Disabling Buttons."), ke && (this.shadowRoot.getElementById("button1").disabled = !0), _e && (this.shadowRoot.getElementById("button2").disabled = !0), ae && (this.shadowRoot.getElementById("button3").disabled = !0), await this.processButtonPress("button3", this.button3_dn)) : Dt.debug("Button 3 is disabled. Ignoring click event.");
    });
  }
  static get observedAttributes() {
    return ["name", "darkmode", "avatar"];
  }
}
window.customElements.define("conference-control-ui", ns);
export {
  ns as default,
  Dt as logger
};
