/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_apollo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/apollo */ \"./pages/config/apollo.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! js-cookie */ \"js-cookie\");\n/* harmony import */ var _config_utility__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/utility */ \"./pages/config/utility.js\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_9__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_6__]);\njs_cookie__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n// Filename: _app.js\n// Description: This file serves as the entrypoint\n// to the website\n//\n// Lokel LLC.\n//\n// Copyright 2020-2022\n//\n// 2021-12-17\n// importing tools\n\n\n\n\n\n\n\n\n\nconst App = ({ Component , pageProps  })=>{\n    const { 0: state , 1: dispatch  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)((prevState, action)=>{\n        switch(action.type){\n            case \"UPDATE_FIELD\":\n                return Object.assign({\n                }, prevState, action.field);\n            default:\n                return prevState;\n        }\n    }, {\n        auth: null\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const tok = js_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"o\");\n        if (tok !== undefined) {\n            utilityFunctionality.updateField({\n                auth: tok\n            });\n        }\n    }, []);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    // creating functionality that needs to be used in other functions outside of\n    // object because the this keyword isn't working\n    const setCookie = (key, value)=>{\n        // Function: setCookie, a function that encrypts a value and sets the cookie\n        //\n        // Parameter(s):\n        //\n        //   self explanatory\n        //\n        // Return Value(s):\n        //\n        //   none\n        // need to encrypt\n        js_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].set(key, value);\n    };\n    const updateField = (field)=>{\n        // Function: updateField, a function that updates a field in the reducer\n        //\n        // Parameter(s):\n        //\n        //   field: an object containing the field that needs to be modified as the\n        //   key and the new value to that key as the value\n        //\n        // Return Value(s):\n        //\n        //   none\n        dispatch({\n            type: \"UPDATE_FIELD\",\n            field: field\n        });\n    };\n    // functions for utility context\n    const utilityFunctionality = {\n        setCookie: setCookie,\n        getCookie: (key)=>{\n            // Function: getCookie, a function that gets a cookie with the desired key\n            //\n            // Parameter(s):\n            //\n            //   self explanatory\n            //\n            // Return Value(s):\n            //\n            //   none\n            // need to decrpyt\n            return js_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(key);\n        },\n        updateField: updateField,\n        signin: (token)=>{\n            // Function: signin, a function that signs in the user\n            //\n            // Parameter(s):\n            //\n            //   token: the authentication token\n            //\n            // Return Value(s):\n            //\n            //   none\n            setCookie(\"o\", token) // saving cookie for persitance\n            ;\n            updateField({\n                auth: token\n            });\n            router.push(\"/dashboard\");\n        },\n        signout: ()=>{\n            // Function: signout, a function that signs the user out\n            //\n            // Parameter(s):\n            //\n            //   none\n            //\n            // Return Value(s):\n            //\n            //   none\n            js_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].remove(\"o\");\n            updateField({\n                auth: null\n            });\n        },\n        auth: state.auth\n    };\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_4___default()), {\n                __source: {\n                    fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                    lineNumber: 139,\n                    columnNumber: 7\n                },\n                __self: undefined,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\",\n                        __source: {\n                            fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                            lineNumber: 140,\n                            columnNumber: 8\n                        },\n                        __self: undefined\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/logo.png\",\n                        __source: {\n                            fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                            lineNumber: 141,\n                            columnNumber: 8\n                        },\n                        __self: undefined\n                    })\n                ]\n            }),\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_apollo_client__WEBPACK_IMPORTED_MODULE_2__.ApolloProvider, {\n                client: _config_apollo__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n                __source: {\n                    fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                    lineNumber: 143,\n                    columnNumber: 7\n                },\n                __self: undefined,\n                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_config_utility__WEBPACK_IMPORTED_MODULE_7__[\"default\"].Provider, {\n                    value: utilityFunctionality,\n                    __source: {\n                        fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                        lineNumber: 144,\n                        columnNumber: 9\n                    },\n                    __self: undefined,\n                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {\n                        ...pageProps,\n                        __source: {\n                            fileName: \"/Users/philippmourasrivastava/Dev/LokelWebsite/pages/_app.js\",\n                            lineNumber: 145,\n                            columnNumber: 11\n                        },\n                        __self: undefined\n                    })\n                })\n            })\n        ]\n    }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztnQkFBQ0wsSUFBSSxFQUFFYSxLQUFLO1lBQUMsQ0FBQztZQUUzQlAsTUFBTSxDQUFDUSxJQUFJLENBQUMsQ0FBWTtRQUUxQixDQUFDO1FBQ0RDLE9BQU8sTUFBUSxDQUFDO1lBQ2QsRUFBd0Q7WUFDeEQsRUFBRTtZQUNGLEVBQWdCO1lBQ2hCLEVBQUU7WUFDRixFQUFTO1lBQ1QsRUFBRTtZQUNGLEVBQW1CO1lBQ25CLEVBQUU7WUFDRixFQUFTO1lBRVQ1Qix3REFBYyxDQUFDLENBQUc7WUFFbEJrQixXQUFXLENBQUMsQ0FBQztnQkFBQ0wsSUFBSSxFQUFFLElBQUk7WUFBQyxDQUFDO1FBQzVCLENBQUM7UUFDREEsSUFBSSxFQUFFUixLQUFLLENBQUNRLElBQUk7SUFDbEIsQ0FBQztJQUVELE1BQU07O2tGQUVEZixrREFBSTs7Ozs7Ozs7eUZBQ0hnQyxDQUFJO3dCQUFDQyxJQUFJLEVBQUMsQ0FBVTt3QkFBQ0MsT0FBTyxFQUFDLENBQXFDOzs7Ozs7Ozt5RkFDbEVDLENBQUk7d0JBQUNDLEdBQUcsRUFBQyxDQUFNO3dCQUFDQyxJQUFJLEVBQUMsQ0FBVzs7Ozs7Ozs7OztpRkFFakN2QywwREFBYztnQkFBQ0MsTUFBTSxFQUFFQSxzREFBTTs7Ozs7OzsrRkFDM0JJLGdFQUF1QjtvQkFBQ3FCLEtBQUssRUFBRUwsb0JBQW9COzs7Ozs7O21HQUNqRGQsU0FBUzsyQkFBS0MsU0FBUzs7Ozs7Ozs7Ozs7O0FBS2xDLENBQUM7QUFFRCxpRUFBZUYsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL2xva2VsLXdlYnNpdGUvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZW5hbWU6IF9hcHAuanNcbi8vIERlc2NyaXB0aW9uOiBUaGlzIGZpbGUgc2VydmVzIGFzIHRoZSBlbnRyeXBvaW50XG4vLyB0byB0aGUgd2Vic2l0ZVxuLy9cbi8vIExva2VsIExMQy5cbi8vXG4vLyBDb3B5cmlnaHQgMjAyMC0yMDIyXG4vL1xuLy8gMjAyMS0xMi0xN1xuXG4vLyBpbXBvcnRpbmcgdG9vbHNcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWR1Y2VyLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwb2xsb1Byb3ZpZGVyIH0gZnJvbSBcIkBhcG9sbG8vY2xpZW50XCI7XG5pbXBvcnQgY2xpZW50IGZyb20gXCIuL2NvbmZpZy9hcG9sbG9cIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IENvb2tpZXMgZnJvbSBcImpzLWNvb2tpZVwiO1xuaW1wb3J0IFV0aWxpdHlDb250ZXh0IGZyb20gXCIuL2NvbmZpZy91dGlsaXR5XCI7XG5cbmltcG9ydCBcImJvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCJcblxuXG5jb25zdCBBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XG5cbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF09IHVzZVJlZHVjZXIoXG4gICAgKHByZXZTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJVUERBVEVfRklFTERcIjpcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJldlN0YXRlLCBhY3Rpb24uZmllbGQpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBwcmV2U3RhdGU7XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBhdXRoOiBudWxsXG4gICAgfVxuICApXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0b2sgPSBDb29raWVzLmdldChcIm9cIilcblxuICAgIGlmKHRvayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB1dGlsaXR5RnVuY3Rpb25hbGl0eS51cGRhdGVGaWVsZCh7IGF1dGg6IHRvayB9KVxuICAgIH1cbiAgfSwgW10pXG5cbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuICAvLyBjcmVhdGluZyBmdW5jdGlvbmFsaXR5IHRoYXQgbmVlZHMgdG8gYmUgdXNlZCBpbiBvdGhlciBmdW5jdGlvbnMgb3V0c2lkZSBvZlxuICAvLyBvYmplY3QgYmVjYXVzZSB0aGUgdGhpcyBrZXl3b3JkIGlzbid0IHdvcmtpbmdcblxuICBjb25zdCBzZXRDb29raWUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIC8vIEZ1bmN0aW9uOiBzZXRDb29raWUsIGEgZnVuY3Rpb24gdGhhdCBlbmNyeXB0cyBhIHZhbHVlIGFuZCBzZXRzIHRoZSBjb29raWVcbiAgICAvL1xuICAgIC8vIFBhcmFtZXRlcihzKTpcbiAgICAvL1xuICAgIC8vICAgc2VsZiBleHBsYW5hdG9yeVxuICAgIC8vXG4gICAgLy8gUmV0dXJuIFZhbHVlKHMpOlxuICAgIC8vXG4gICAgLy8gICBub25lXG5cbiAgICAvLyBuZWVkIHRvIGVuY3J5cHRcbiAgICBDb29raWVzLnNldChrZXksIHZhbHVlKVxuICB9XG5cbiAgY29uc3QgdXBkYXRlRmllbGQgPSAoZmllbGQpID0+IHtcbiAgICAvLyBGdW5jdGlvbjogdXBkYXRlRmllbGQsIGEgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIGEgZmllbGQgaW4gdGhlIHJlZHVjZXJcbiAgICAvL1xuICAgIC8vIFBhcmFtZXRlcihzKTpcbiAgICAvL1xuICAgIC8vICAgZmllbGQ6IGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmaWVsZCB0aGF0IG5lZWRzIHRvIGJlIG1vZGlmaWVkIGFzIHRoZVxuICAgIC8vICAga2V5IGFuZCB0aGUgbmV3IHZhbHVlIHRvIHRoYXQga2V5IGFzIHRoZSB2YWx1ZVxuICAgIC8vXG4gICAgLy8gUmV0dXJuIFZhbHVlKHMpOlxuICAgIC8vXG4gICAgLy8gICBub25lXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBcIlVQREFURV9GSUVMRFwiLCBmaWVsZDogZmllbGQgfSlcbiAgfVxuXG5cbiAgLy8gZnVuY3Rpb25zIGZvciB1dGlsaXR5IGNvbnRleHRcbiAgY29uc3QgdXRpbGl0eUZ1bmN0aW9uYWxpdHkgPSB7XG4gICAgc2V0Q29va2llOiBzZXRDb29raWUsXG4gICAgZ2V0Q29va2llOiAoa2V5KSA9PiB7XG4gICAgICAvLyBGdW5jdGlvbjogZ2V0Q29va2llLCBhIGZ1bmN0aW9uIHRoYXQgZ2V0cyBhIGNvb2tpZSB3aXRoIHRoZSBkZXNpcmVkIGtleVxuICAgICAgLy9cbiAgICAgIC8vIFBhcmFtZXRlcihzKTpcbiAgICAgIC8vXG4gICAgICAvLyAgIHNlbGYgZXhwbGFuYXRvcnlcbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm4gVmFsdWUocyk6XG4gICAgICAvL1xuICAgICAgLy8gICBub25lXG5cbiAgICAgIC8vIG5lZWQgdG8gZGVjcnB5dFxuICAgICAgcmV0dXJuIENvb2tpZXMuZ2V0KGtleSlcbiAgICB9LFxuICAgIHVwZGF0ZUZpZWxkOiB1cGRhdGVGaWVsZCxcbiAgICBzaWduaW46ICh0b2tlbikgPT4ge1xuICAgICAgLy8gRnVuY3Rpb246IHNpZ25pbiwgYSBmdW5jdGlvbiB0aGF0IHNpZ25zIGluIHRoZSB1c2VyXG4gICAgICAvL1xuICAgICAgLy8gUGFyYW1ldGVyKHMpOlxuICAgICAgLy9cbiAgICAgIC8vICAgdG9rZW46IHRoZSBhdXRoZW50aWNhdGlvbiB0b2tlblxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybiBWYWx1ZShzKTpcbiAgICAgIC8vXG4gICAgICAvLyAgIG5vbmVcblxuICAgICAgc2V0Q29va2llKFwib1wiLCB0b2tlbikgLy8gc2F2aW5nIGNvb2tpZSBmb3IgcGVyc2l0YW5jZVxuXG4gICAgICB1cGRhdGVGaWVsZCh7IGF1dGg6IHRva2VuIH0pXG5cbiAgICAgIHJvdXRlci5wdXNoKFwiL2Rhc2hib2FyZFwiKVxuXG4gICAgfSxcbiAgICBzaWdub3V0OiAoKSA9PiB7XG4gICAgICAvLyBGdW5jdGlvbjogc2lnbm91dCwgYSBmdW5jdGlvbiB0aGF0IHNpZ25zIHRoZSB1c2VyIG91dFxuICAgICAgLy9cbiAgICAgIC8vIFBhcmFtZXRlcihzKTpcbiAgICAgIC8vXG4gICAgICAvLyAgIG5vbmVcbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm4gVmFsdWUocyk6XG4gICAgICAvL1xuICAgICAgLy8gICBub25lXG5cbiAgICAgIENvb2tpZXMucmVtb3ZlKFwib1wiKVxuXG4gICAgICB1cGRhdGVGaWVsZCh7IGF1dGg6IG51bGwgfSlcbiAgICB9LFxuICAgIGF1dGg6IHN0YXRlLmF1dGhcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiLz5cbiAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9sb2dvLnBuZ1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8QXBvbGxvUHJvdmlkZXIgY2xpZW50PXtjbGllbnR9PlxuICAgICAgICA8VXRpbGl0eUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3V0aWxpdHlGdW5jdGlvbmFsaXR5fT5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvVXRpbGl0eUNvbnRleHQuUHJvdmlkZXI+XG4gICAgICA8L0Fwb2xsb1Byb3ZpZGVyPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsIkFwb2xsb1Byb3ZpZGVyIiwiY2xpZW50IiwiSGVhZCIsInVzZVJvdXRlciIsIkNvb2tpZXMiLCJVdGlsaXR5Q29udGV4dCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInN0YXRlIiwiZGlzcGF0Y2giLCJwcmV2U3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGQiLCJhdXRoIiwidG9rIiwiZ2V0IiwidW5kZWZpbmVkIiwidXRpbGl0eUZ1bmN0aW9uYWxpdHkiLCJ1cGRhdGVGaWVsZCIsInJvdXRlciIsInNldENvb2tpZSIsImtleSIsInZhbHVlIiwic2V0IiwiZ2V0Q29va2llIiwic2lnbmluIiwidG9rZW4iLCJwdXNoIiwic2lnbm91dCIsInJlbW92ZSIsIm1ldGEiLCJuYW1lIiwiY29udGVudCIsImxpbmsiLCJyZWwiLCJocmVmIiwiUHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./pages/config/apollo.js":
/*!********************************!*\
  !*** ./pages/config/apollo.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);\n// Filename: apollo.js\n// Description: This file implements the apollo client\n// configuration for the webite\n//\n// Lokel LLC.\n//\n// Copyright 2020-2022\n//\n// 2022-01-02\n// importing tools\n\nconst client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({\n    uri: \"http://localhost:6535\",\n    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache()\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jb25maWcvYXBvbGxvLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEVBQXNCO0FBQ3RCLEVBQXNEO0FBQ3RELEVBQStCO0FBQy9CLEVBQUU7QUFDRixFQUFhO0FBQ2IsRUFBRTtBQUNGLEVBQXNCO0FBQ3RCLEVBQUU7QUFDRixFQUFhO0FBRWIsRUFBa0I7QUFDMEM7QUFFNUQsS0FBSyxDQUFDRSxNQUFNLEdBQUcsR0FBRyxDQUFDRix3REFBWSxDQUFDLENBQUM7SUFDN0JHLEdBQUcsRUFBRSxDQUF1QjtJQUM1QkMsS0FBSyxFQUFFLEdBQUcsQ0FBQ0gseURBQWE7QUFDNUIsQ0FBQztBQUVELGlFQUFlQyxNQUFNLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sb2tlbC13ZWJzaXRlLy4vcGFnZXMvY29uZmlnL2Fwb2xsby5qcz9lYmMyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGVuYW1lOiBhcG9sbG8uanNcbi8vIERlc2NyaXB0aW9uOiBUaGlzIGZpbGUgaW1wbGVtZW50cyB0aGUgYXBvbGxvIGNsaWVudFxuLy8gY29uZmlndXJhdGlvbiBmb3IgdGhlIHdlYml0ZVxuLy9cbi8vIExva2VsIExMQy5cbi8vXG4vLyBDb3B5cmlnaHQgMjAyMC0yMDIyXG4vL1xuLy8gMjAyMi0wMS0wMlxuXG4vLyBpbXBvcnRpbmcgdG9vbHNcbmltcG9ydCB7IEFwb2xsb0NsaWVudCwgSW5NZW1vcnlDYWNoZSB9IGZyb20gXCJAYXBvbGxvL2NsaWVudFwiO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgICB1cmk6IFwiaHR0cDovL2xvY2FsaG9zdDo2NTM1XCIsXG4gICAgY2FjaGU6IG5ldyBJbk1lbW9yeUNhY2hlKCksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xpZW50O1xuIl0sIm5hbWVzIjpbIkFwb2xsb0NsaWVudCIsIkluTWVtb3J5Q2FjaGUiLCJjbGllbnQiLCJ1cmkiLCJjYWNoZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/config/apollo.js\n");

/***/ }),

/***/ "./pages/config/utility.js":
/*!*********************************!*\
  !*** ./pages/config/utility.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n// Filename: apollo.js\n// Description: This file implements the apollo client\n// configuration for the webite\n//\n// Lokel LLC.\n//\n// Copyright 2020-2022\n//\n// 2022-01-08\n// importing tools\n\n//creting context\nconst UtilityContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();\n//eporting context\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UtilityContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jb25maWcvdXRpbGl0eS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxFQUFzQjtBQUN0QixFQUFzRDtBQUN0RCxFQUErQjtBQUMvQixFQUFFO0FBQ0YsRUFBYTtBQUNiLEVBQUU7QUFDRixFQUFzQjtBQUN0QixFQUFFO0FBQ0YsRUFBYTtBQUViLEVBQWtCO0FBQ21CO0FBRXJDLEVBQWlCO0FBQ2pCLEtBQUssQ0FBQ0MsY0FBYyxpQkFBR0Qsb0RBQWE7QUFFcEMsRUFBa0I7QUFDbEIsaUVBQWVDLGNBQWMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xva2VsLXdlYnNpdGUvLi9wYWdlcy9jb25maWcvdXRpbGl0eS5qcz8yYmM2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGVuYW1lOiBhcG9sbG8uanNcbi8vIERlc2NyaXB0aW9uOiBUaGlzIGZpbGUgaW1wbGVtZW50cyB0aGUgYXBvbGxvIGNsaWVudFxuLy8gY29uZmlndXJhdGlvbiBmb3IgdGhlIHdlYml0ZVxuLy9cbi8vIExva2VsIExMQy5cbi8vXG4vLyBDb3B5cmlnaHQgMjAyMC0yMDIyXG4vL1xuLy8gMjAyMi0wMS0wOFxuXG4vLyBpbXBvcnRpbmcgdG9vbHNcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcblxuLy9jcmV0aW5nIGNvbnRleHRcbmNvbnN0IFV0aWxpdHlDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xuXG4vL2Vwb3J0aW5nIGNvbnRleHRcbmV4cG9ydCBkZWZhdWx0IFV0aWxpdHlDb250ZXh0O1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJVdGlsaXR5Q29udGV4dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/config/utility.js\n");

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/client");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = import("js-cookie");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();