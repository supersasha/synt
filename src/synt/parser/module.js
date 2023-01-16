/**
 * This file was generated from src/synt/parser/module.peg
 * See https://canopy.jcoglan.com/ for documentation
 */

(function () {
  'use strict';

  function TreeNode (text, offset, elements) {
    this.text = text;
    this.offset = offset;
    this.elements = elements;
  }

  TreeNode.prototype.forEach = function (block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
      block.call(context, el[i], i, el);
    }
  };

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    TreeNode.prototype[Symbol.iterator] = function () {
      return this.elements[Symbol.iterator]();
    };
  }

  var TreeNode1 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['moduleDecl'] = elements[0];
    this['instanceDecls'] = elements[4];
  };
  inherit(TreeNode1, TreeNode);

  var TreeNode2 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['importDecls'] = elements[1];
  };
  inherit(TreeNode2, TreeNode);

  var TreeNode3 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['inputDecls'] = elements[1];
  };
  inherit(TreeNode3, TreeNode);

  var TreeNode4 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['outputDecls'] = elements[1];
  };
  inherit(TreeNode4, TreeNode);

  var TreeNode5 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[1];
  };
  inherit(TreeNode5, TreeNode);

  var TreeNode6 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['importDecl'] = elements[0];
  };
  inherit(TreeNode6, TreeNode);

  var TreeNode7 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['importDecl'] = elements[1];
  };
  inherit(TreeNode7, TreeNode);

  var TreeNode8 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[6];
    this['ident'] = elements[2];
    this['string'] = elements[7];
  };
  inherit(TreeNode8, TreeNode);

  var TreeNode9 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ows'] = elements[2];
    this['ident'] = elements[3];
  };
  inherit(TreeNode9, TreeNode);

  var TreeNode10 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['inputDecl'] = elements[0];
  };
  inherit(TreeNode10, TreeNode);

  var TreeNode11 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['inputDecl'] = elements[1];
  };
  inherit(TreeNode11, TreeNode);

  var TreeNode12 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[5];
    this['ident'] = elements[2];
    this['number'] = elements[6];
  };
  inherit(TreeNode12, TreeNode);

  var TreeNode13 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['outputDecl'] = elements[0];
  };
  inherit(TreeNode13, TreeNode);

  var TreeNode14 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['outputDecl'] = elements[1];
  };
  inherit(TreeNode14, TreeNode);

  var TreeNode15 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[1];
    this['ident'] = elements[2];
  };
  inherit(TreeNode15, TreeNode);

  var TreeNode16 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['instanceDecl'] = elements[0];
  };
  inherit(TreeNode16, TreeNode);

  var TreeNode17 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['instanceDecl'] = elements[1];
  };
  inherit(TreeNode17, TreeNode);

  var TreeNode18 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[10];
    this['ident'] = elements[2];
    this['instConstr'] = elements[6];
  };
  inherit(TreeNode18, TreeNode);

  var TreeNode19 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['instDecls'] = elements[1];
  };
  inherit(TreeNode19, TreeNode);

  var TreeNode20 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
  };
  inherit(TreeNode20, TreeNode);

  var TreeNode21 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ows'] = elements[4];
    this['constrArgs'] = elements[3];
  };
  inherit(TreeNode21, TreeNode);

  var TreeNode22 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['constrArg'] = elements[0];
  };
  inherit(TreeNode22, TreeNode);

  var TreeNode23 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ows'] = elements[2];
    this['constrArg'] = elements[3];
  };
  inherit(TreeNode23, TreeNode);

  var TreeNode24 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['instDecl'] = elements[0];
  };
  inherit(TreeNode24, TreeNode);

  var TreeNode25 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[0];
    this['instDecl'] = elements[1];
  };
  inherit(TreeNode25, TreeNode);

  var TreeNode26 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[0];
    this['ows'] = elements[3];
    this['value'] = elements[4];
  };
  inherit(TreeNode26, TreeNode);

  var TreeNode27 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ws'] = elements[7];
    this['ident'] = elements[8];
  };
  inherit(TreeNode27, TreeNode);

  var TreeNode28 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ident'] = elements[2];
  };
  inherit(TreeNode28, TreeNode);

  var TreeNode29 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['comment'] = elements[0];
  };
  inherit(TreeNode29, TreeNode);

  var TreeNode30 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['ows'] = elements[2];
  };
  inherit(TreeNode30, TreeNode);

  var FAILURE = {};

  var Grammar = {
    _read_module () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._module = this._cache._module || {};
      var cached = this._cache._module[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      address1 = this._read_moduleDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(2);
        var address3 = FAILURE;
        address3 = this._read_ws();
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          address4 = this._read_importDecls();
          if (address4 !== FAILURE) {
            elements1[1] = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode2(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address5 = FAILURE;
          var index4 = this._offset;
          var index5 = this._offset, elements2 = new Array(2);
          var address6 = FAILURE;
          address6 = this._read_ws();
          if (address6 !== FAILURE) {
            elements2[0] = address6;
            var address7 = FAILURE;
            address7 = this._read_inputDecls();
            if (address7 !== FAILURE) {
              elements2[1] = address7;
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2 === null) {
            address5 = FAILURE;
          } else {
            address5 = new TreeNode3(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          }
          if (address5 === FAILURE) {
            address5 = new TreeNode(this._input.substring(index4, index4), index4, []);
            this._offset = index4;
          }
          if (address5 !== FAILURE) {
            elements0[2] = address5;
            var address8 = FAILURE;
            var index6 = this._offset;
            var index7 = this._offset, elements3 = new Array(2);
            var address9 = FAILURE;
            address9 = this._read_ws();
            if (address9 !== FAILURE) {
              elements3[0] = address9;
              var address10 = FAILURE;
              address10 = this._read_outputDecls();
              if (address10 !== FAILURE) {
                elements3[1] = address10;
              } else {
                elements3 = null;
                this._offset = index7;
              }
            } else {
              elements3 = null;
              this._offset = index7;
            }
            if (elements3 === null) {
              address8 = FAILURE;
            } else {
              address8 = new TreeNode4(this._input.substring(index7, this._offset), index7, elements3);
              this._offset = this._offset;
            }
            if (address8 === FAILURE) {
              address8 = new TreeNode(this._input.substring(index6, index6), index6, []);
              this._offset = index6;
            }
            if (address8 !== FAILURE) {
              elements0[3] = address8;
              var address11 = FAILURE;
              address11 = this._read_ws();
              if (address11 !== FAILURE) {
                var address12 = FAILURE;
                address12 = this._read_instanceDecls();
                if (address12 !== FAILURE) {
                  elements0[4] = address12;
                  var address13 = FAILURE;
                  address13 = this._read_ows();
                  if (address13 !== FAILURE) {
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildModule(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._module[index0] = [address0, this._offset];
      return address0;
    },

    _read_moduleDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._moduleDecl = this._cache._moduleDecl || {};
      var cached = this._cache._moduleDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 6;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'MODULE') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
        this._offset = this._offset + 6;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::moduleDecl', '"MODULE"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[1] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildName(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._moduleDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_importDecls () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._importDecls = this._cache._importDecls || {};
      var cached = this._cache._importDecls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_importDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          address4 = this._read_ws();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_importDecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode7(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildImports(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._importDecls[index0] = [address0, this._offset];
      return address0;
    },

    _read_importDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._importDecl = this._cache._importDecl || {};
      var cached = this._cache._importDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(8);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 6;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'IMPORT') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
        this._offset = this._offset + 6;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::importDecl', '"IMPORT"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            var index2 = this._offset, elements1 = [], address5 = null;
            while (true) {
              var index3 = this._offset, elements2 = new Array(4);
              var address6 = FAILURE;
              address6 = this._read_ows();
              if (address6 !== FAILURE) {
                elements2[0] = address6;
                var address7 = FAILURE;
                var chunk1 = null, max1 = this._offset + 1;
                if (max1 <= this._inputSize) {
                  chunk1 = this._input.substring(this._offset, max1);
                }
                if (chunk1 === ',') {
                  address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                  this._offset = this._offset + 1;
                } else {
                  address7 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push(['Module::importDecl', '","']);
                  }
                }
                if (address7 !== FAILURE) {
                  elements2[1] = address7;
                  var address8 = FAILURE;
                  address8 = this._read_ows();
                  if (address8 !== FAILURE) {
                    elements2[2] = address8;
                    var address9 = FAILURE;
                    address9 = this._read_ident();
                    if (address9 !== FAILURE) {
                      elements2[3] = address9;
                    } else {
                      elements2 = null;
                      this._offset = index3;
                    }
                  } else {
                    elements2 = null;
                    this._offset = index3;
                  }
                } else {
                  elements2 = null;
                  this._offset = index3;
                }
              } else {
                elements2 = null;
                this._offset = index3;
              }
              if (elements2 === null) {
                address5 = FAILURE;
              } else {
                address5 = new TreeNode9(this._input.substring(index3, this._offset), index3, elements2);
                this._offset = this._offset;
              }
              if (address5 !== FAILURE) {
                elements1.push(address5);
              } else {
                break;
              }
            }
            if (elements1.length >= 0) {
              address4 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
              this._offset = this._offset;
            } else {
              address4 = FAILURE;
            }
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address10 = FAILURE;
              address10 = this._read_ws();
              if (address10 !== FAILURE) {
                elements0[4] = address10;
                var address11 = FAILURE;
                var chunk2 = null, max2 = this._offset + 4;
                if (max2 <= this._inputSize) {
                  chunk2 = this._input.substring(this._offset, max2);
                }
                if (chunk2 === 'FROM') {
                  address11 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
                  this._offset = this._offset + 4;
                } else {
                  address11 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push(['Module::importDecl', '"FROM"']);
                  }
                }
                if (address11 !== FAILURE) {
                  elements0[5] = address11;
                  var address12 = FAILURE;
                  address12 = this._read_ws();
                  if (address12 !== FAILURE) {
                    elements0[6] = address12;
                    var address13 = FAILURE;
                    address13 = this._read_string();
                    if (address13 !== FAILURE) {
                      elements0[7] = address13;
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildImport(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._importDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_inputDecls () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._inputDecls = this._cache._inputDecls || {};
      var cached = this._cache._inputDecls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_inputDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          address4 = this._read_ws();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_inputDecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode11(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInputs(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._inputDecls[index0] = [address0, this._offset];
      return address0;
    },

    _read_inputDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._inputDecl = this._cache._inputDecl || {};
      var cached = this._cache._inputDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(7);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 5;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'INPUT') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset, []);
        this._offset = this._offset + 5;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::inputDecl', '"INPUT"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ws();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk1 = null, max1 = this._offset + 8;
              if (max1 <= this._inputSize) {
                chunk1 = this._input.substring(this._offset, max1);
              }
              if (chunk1 === 'DEFAULTS') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 8), this._offset, []);
                this._offset = this._offset + 8;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['Module::inputDecl', '"DEFAULTS"']);
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                address6 = this._read_ws();
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_number();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInput(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._inputDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_outputDecls () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._outputDecls = this._cache._outputDecls || {};
      var cached = this._cache._outputDecls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_outputDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          address4 = this._read_ws();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_outputDecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode14(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildOutputs(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._outputDecls[index0] = [address0, this._offset];
      return address0;
    },

    _read_outputDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._outputDecl = this._cache._outputDecl || {};
      var cached = this._cache._outputDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 6;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'OUTPUT') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
        this._offset = this._offset + 6;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::outputDecl', '"OUTPUT"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildOutput(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._outputDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_instanceDecls () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._instanceDecls = this._cache._instanceDecls || {};
      var cached = this._cache._instanceDecls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_instanceDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          address4 = this._read_ws();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_instanceDecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode17(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInstances(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._instanceDecls[index0] = [address0, this._offset];
      return address0;
    },

    _read_instanceDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._instanceDecl = this._cache._instanceDecl || {};
      var cached = this._cache._instanceDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(12);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 8;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'INSTANCE') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 8), this._offset, []);
        this._offset = this._offset + 8;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::instanceDecl', '"INSTANCE"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ws();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              var chunk1 = null, max1 = this._offset + 2;
              if (max1 <= this._inputSize) {
                chunk1 = this._input.substring(this._offset, max1);
              }
              if (chunk1 === 'OF') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
                this._offset = this._offset + 2;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['Module::instanceDecl', '"OF"']);
                }
              }
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                address6 = this._read_ws();
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  address7 = this._read_instConstr();
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    address8 = this._read_ws();
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      var chunk2 = null, max2 = this._offset + 4;
                      if (max2 <= this._inputSize) {
                        chunk2 = this._input.substring(this._offset, max2);
                      }
                      if (chunk2 === 'WITH') {
                        address9 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
                        this._offset = this._offset + 4;
                      } else {
                        address9 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push(['Module::instanceDecl', '"WITH"']);
                        }
                      }
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                        var address10 = FAILURE;
                        var index2 = this._offset;
                        var index3 = this._offset, elements1 = new Array(2);
                        var address11 = FAILURE;
                        address11 = this._read_ws();
                        if (address11 !== FAILURE) {
                          elements1[0] = address11;
                          var address12 = FAILURE;
                          address12 = this._read_instDecls();
                          if (address12 !== FAILURE) {
                            elements1[1] = address12;
                          } else {
                            elements1 = null;
                            this._offset = index3;
                          }
                        } else {
                          elements1 = null;
                          this._offset = index3;
                        }
                        if (elements1 === null) {
                          address10 = FAILURE;
                        } else {
                          address10 = new TreeNode19(this._input.substring(index3, this._offset), index3, elements1);
                          this._offset = this._offset;
                        }
                        if (address10 === FAILURE) {
                          address10 = new TreeNode(this._input.substring(index2, index2), index2, []);
                          this._offset = index2;
                        }
                        if (address10 !== FAILURE) {
                          elements0[9] = address10;
                          var address13 = FAILURE;
                          address13 = this._read_ws();
                          if (address13 !== FAILURE) {
                            elements0[10] = address13;
                            var address14 = FAILURE;
                            var chunk3 = null, max3 = this._offset + 3;
                            if (max3 <= this._inputSize) {
                              chunk3 = this._input.substring(this._offset, max3);
                            }
                            if (chunk3 === 'END') {
                              address14 = new TreeNode(this._input.substring(this._offset, this._offset + 3), this._offset, []);
                              this._offset = this._offset + 3;
                            } else {
                              address14 = FAILURE;
                              if (this._offset > this._failure) {
                                this._failure = this._offset;
                                this._expected = [];
                              }
                              if (this._offset === this._failure) {
                                this._expected.push(['Module::instanceDecl', '"END"']);
                              }
                            }
                            if (address14 !== FAILURE) {
                              elements0[11] = address14;
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInstance(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._instanceDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_instConstr () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._instConstr = this._cache._instConstr || {};
      var cached = this._cache._instConstr[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_ident();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(6);
        var address3 = FAILURE;
        address3 = this._read_ows();
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          var chunk0 = null, max0 = this._offset + 1;
          if (max0 <= this._inputSize) {
            chunk0 = this._input.substring(this._offset, max0);
          }
          if (chunk0 === '(') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::instConstr', '"("']);
            }
          }
          if (address4 !== FAILURE) {
            elements1[1] = address4;
            var address5 = FAILURE;
            address5 = this._read_ows();
            if (address5 !== FAILURE) {
              elements1[2] = address5;
              var address6 = FAILURE;
              address6 = this._read_constrArgs();
              if (address6 !== FAILURE) {
                elements1[3] = address6;
                var address7 = FAILURE;
                address7 = this._read_ows();
                if (address7 !== FAILURE) {
                  elements1[4] = address7;
                  var address8 = FAILURE;
                  var chunk1 = null, max1 = this._offset + 1;
                  if (max1 <= this._inputSize) {
                    chunk1 = this._input.substring(this._offset, max1);
                  }
                  if (chunk1 === ')') {
                    address8 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                    this._offset = this._offset + 1;
                  } else {
                    address8 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push(['Module::instConstr', '")"']);
                    }
                  }
                  if (address8 !== FAILURE) {
                    elements1[5] = address8;
                  } else {
                    elements1 = null;
                    this._offset = index3;
                  }
                } else {
                  elements1 = null;
                  this._offset = index3;
                }
              } else {
                elements1 = null;
                this._offset = index3;
              }
            } else {
              elements1 = null;
              this._offset = index3;
            }
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode21(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInstConstr(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._instConstr[index0] = [address0, this._offset];
      return address0;
    },

    _read_constrArgs () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._constrArgs = this._cache._constrArgs || {};
      var cached = this._cache._constrArgs[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_constrArg();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(4);
          var address4 = FAILURE;
          address4 = this._read_ows();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            var chunk0 = null, max0 = this._offset + 1;
            if (max0 <= this._inputSize) {
              chunk0 = this._input.substring(this._offset, max0);
            }
            if (chunk0 === ',') {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['Module::constrArgs', '","']);
              }
            }
            if (address5 !== FAILURE) {
              elements2[1] = address5;
              var address6 = FAILURE;
              address6 = this._read_ows();
              if (address6 !== FAILURE) {
                elements2[2] = address6;
                var address7 = FAILURE;
                address7 = this._read_constrArg();
                if (address7 !== FAILURE) {
                  elements2[3] = address7;
                } else {
                  elements2 = null;
                  this._offset = index3;
                }
              } else {
                elements2 = null;
                this._offset = index3;
              }
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode23(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildConstrArgs(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._constrArgs[index0] = [address0, this._offset];
      return address0;
    },

    _read_constrArg () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._constrArg = this._cache._constrArg || {};
      var cached = this._cache._constrArg[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_number();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_string();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._constrArg[index0] = [address0, this._offset];
      return address0;
    },

    _read_instDecls () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._instDecls = this._cache._instDecls || {};
      var cached = this._cache._instDecls[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_instDecl();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          address4 = this._read_ws();
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_instDecl();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode25(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInstDecls(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._instDecls[index0] = [address0, this._offset];
      return address0;
    },

    _read_instDecl () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._instDecl = this._cache._instDecl || {};
      var cached = this._cache._instDecl[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_inp();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_expose();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._instDecl[index0] = [address0, this._offset];
      return address0;
    },

    _read_inp () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._inp = this._cache._inp || {};
      var cached = this._cache._inp[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      address1 = this._read_ident();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ows();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var chunk0 = null, max0 = this._offset + 1;
          if (max0 <= this._inputSize) {
            chunk0 = this._input.substring(this._offset, max0);
          }
          if (chunk0 === '=') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::inp', '"="']);
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ows();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_value();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildInp(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._inp[index0] = [address0, this._offset];
      return address0;
    },

    _read_value () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._value = this._cache._value || {};
      var cached = this._cache._value[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_number();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_outRef();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_ident();
          if (address0 === FAILURE) {
            this._offset = index1;
          }
        }
      }
      this._cache._value[index0] = [address0, this._offset];
      return address0;
    },

    _read_expose () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._expose = this._cache._expose || {};
      var cached = this._cache._expose[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(9);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 6;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'EXPOSE') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
        this._offset = this._offset + 6;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::expose', '"EXPOSE"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_ws();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          var chunk1 = null, max1 = this._offset + 6;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 === 'OUTPUT') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
            this._offset = this._offset + 6;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::expose', '"OUTPUT"']);
            }
          }
          if (address3 !== FAILURE) {
            elements0[2] = address3;
            var address4 = FAILURE;
            address4 = this._read_ws();
            if (address4 !== FAILURE) {
              elements0[3] = address4;
              var address5 = FAILURE;
              address5 = this._read_ident();
              if (address5 !== FAILURE) {
                elements0[4] = address5;
                var address6 = FAILURE;
                address6 = this._read_ws();
                if (address6 !== FAILURE) {
                  elements0[5] = address6;
                  var address7 = FAILURE;
                  var chunk2 = null, max2 = this._offset + 2;
                  if (max2 <= this._inputSize) {
                    chunk2 = this._input.substring(this._offset, max2);
                  }
                  if (chunk2 === 'AS') {
                    address7 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
                    this._offset = this._offset + 2;
                  } else {
                    address7 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push(['Module::expose', '"AS"']);
                    }
                  }
                  if (address7 !== FAILURE) {
                    elements0[6] = address7;
                    var address8 = FAILURE;
                    address8 = this._read_ws();
                    if (address8 !== FAILURE) {
                      elements0[7] = address8;
                      var address9 = FAILURE;
                      address9 = this._read_ident();
                      if (address9 !== FAILURE) {
                        elements0[8] = address9;
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildExpose(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._expose[index0] = [address0, this._offset];
      return address0;
    },

    _read_number () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._number = this._cache._number || {};
      var cached = this._cache._number[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var index2 = this._offset;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '-') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::number', '"-"']);
        }
      }
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2, []);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index3 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[0-9]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::number', '[0-9]']);
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 1) {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var index4 = this._offset;
          var index5 = this._offset, elements2 = new Array(2);
          var address5 = FAILURE;
          var chunk2 = null, max2 = this._offset + 1;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 === '.') {
            address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address5 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::number', '"."']);
            }
          }
          if (address5 !== FAILURE) {
            elements2[0] = address5;
            var address6 = FAILURE;
            var index6 = this._offset, elements3 = [], address7 = null;
            while (true) {
              var chunk3 = null, max3 = this._offset + 1;
              if (max3 <= this._inputSize) {
                chunk3 = this._input.substring(this._offset, max3);
              }
              if (chunk3 !== null && /^[0-9]/.test(chunk3)) {
                address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address7 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['Module::number', '[0-9]']);
                }
              }
              if (address7 !== FAILURE) {
                elements3.push(address7);
              } else {
                break;
              }
            }
            if (elements3.length >= 1) {
              address6 = new TreeNode(this._input.substring(index6, this._offset), index6, elements3);
              this._offset = this._offset;
            } else {
              address6 = FAILURE;
            }
            if (address6 !== FAILURE) {
              elements2[1] = address6;
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2 === null) {
            address4 = FAILURE;
          } else {
            address4 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          }
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(index4, index4), index4, []);
            this._offset = index4;
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildNumber(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._number[index0] = [address0, this._offset];
      return address0;
    },

    _read_outRef () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._outRef = this._cache._outRef || {};
      var cached = this._cache._outRef[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_ident();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 === ':') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['Module::outRef', '":"']);
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ident();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildOutRef(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._outRef[index0] = [address0, this._offset];
      return address0;
    },

    _read_ident () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ident = this._cache._ident || {};
      var cached = this._cache._ident[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^[a-zA-Z]/.test(chunk0)) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::ident', '[a-zA-Z]']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[a-zA-Z0-9_]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::ident', '[a-zA-Z0-9_]']);
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildIdent(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._ident[index0] = [address0, this._offset];
      return address0;
    },

    _read_ows () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ows = this._cache._ows || {};
      var cached = this._cache._ows[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_ws();
      if (address0 === FAILURE) {
        address0 = new TreeNode(this._input.substring(index1, index1), index1, []);
        this._offset = index1;
      }
      this._cache._ows[index0] = [address0, this._offset];
      return address0;
    },

    _read_ws () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._ws = this._cache._ws || {};
      var cached = this._cache._ws[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var index2 = this._offset, elements1 = [], address2 = null;
      while (true) {
        address2 = this._read_wsc();
        if (address2 !== FAILURE) {
          elements1.push(address2);
        } else {
          break;
        }
      }
      if (elements1.length >= 1) {
        address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = FAILURE;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address3 = FAILURE;
        var index3 = this._offset, elements2 = [], address4 = null;
        while (true) {
          var index4 = this._offset, elements3 = new Array(2);
          var address5 = FAILURE;
          address5 = this._read_comment();
          if (address5 !== FAILURE) {
            elements3[0] = address5;
            var address6 = FAILURE;
            var index5 = this._offset, elements4 = [], address7 = null;
            while (true) {
              address7 = this._read_wsc();
              if (address7 !== FAILURE) {
                elements4.push(address7);
              } else {
                break;
              }
            }
            if (elements4.length >= 1) {
              address6 = new TreeNode(this._input.substring(index5, this._offset), index5, elements4);
              this._offset = this._offset;
            } else {
              address6 = FAILURE;
            }
            if (address6 !== FAILURE) {
              elements3[1] = address6;
            } else {
              elements3 = null;
              this._offset = index4;
            }
          } else {
            elements3 = null;
            this._offset = index4;
          }
          if (elements3 === null) {
            address4 = FAILURE;
          } else {
            address4 = new TreeNode29(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          }
          if (address4 !== FAILURE) {
            elements2.push(address4);
          } else {
            break;
          }
        }
        if (elements2.length >= 0) {
          address3 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
          this._offset = this._offset;
        } else {
          address3 = FAILURE;
        }
        if (address3 !== FAILURE) {
          elements0[1] = address3;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildNothing(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._ws[index0] = [address0, this._offset];
      return address0;
    },

    _read_wsc () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._wsc = this._cache._wsc || {};
      var cached = this._cache._wsc[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^[ \t\n\r]/.test(chunk0)) {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::wsc', '[ \\t\\n\\r]']);
        }
      }
      this._cache._wsc[index0] = [address0, this._offset];
      return address0;
    },

    _read_string () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._string = this._cache._string || {};
      var cached = this._cache._string[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '"') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::string', '"\\""']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[^"]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::string', '[^"]']);
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address4 = FAILURE;
          var chunk2 = null, max2 = this._offset + 1;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 === '"') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::string', '"\\""']);
            }
          }
          if (address4 !== FAILURE) {
            elements0[2] = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.buildString(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._string[index0] = [address0, this._offset];
      return address0;
    },

    _read_comma () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comma = this._cache._comma || {};
      var cached = this._cache._comma[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_ows();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 === ',') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['Module::comma', '","']);
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_ows();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode30(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._comma[index0] = [address0, this._offset];
      return address0;
    },

    _read_comment () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._comment = this._cache._comment || {};
      var cached = this._cache._comment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 2;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '(*') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
        this._offset = this._offset + 2;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['Module::comment', '"(*"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset;
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[^*]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::comment', '[^*]']);
            }
          }
          if (address3 === FAILURE) {
            this._offset = index3;
            var index4 = this._offset, elements2 = new Array(2);
            var address4 = FAILURE;
            var chunk2 = null, max2 = this._offset + 1;
            if (max2 <= this._inputSize) {
              chunk2 = this._input.substring(this._offset, max2);
            }
            if (chunk2 === '*') {
              address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address4 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['Module::comment', '"*"']);
              }
            }
            if (address4 !== FAILURE) {
              elements2[0] = address4;
              var address5 = FAILURE;
              var index5 = this._offset;
              var chunk3 = null, max3 = this._offset + 1;
              if (max3 <= this._inputSize) {
                chunk3 = this._input.substring(this._offset, max3);
              }
              if (chunk3 === ')') {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address5 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['Module::comment', '")"']);
                }
              }
              this._offset = index5;
              if (address5 === FAILURE) {
                address5 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset, []);
                this._offset = this._offset;
              } else {
                address5 = FAILURE;
              }
              if (address5 !== FAILURE) {
                elements2[1] = address5;
              } else {
                elements2 = null;
                this._offset = index4;
              }
            } else {
              elements2 = null;
              this._offset = index4;
            }
            if (elements2 === null) {
              address3 = FAILURE;
            } else {
              address3 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
              this._offset = this._offset;
            }
            if (address3 === FAILURE) {
              this._offset = index3;
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address6 = FAILURE;
          var chunk4 = null, max4 = this._offset + 2;
          if (max4 <= this._inputSize) {
            chunk4 = this._input.substring(this._offset, max4);
          }
          if (chunk4 === '*)') {
            address6 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
            this._offset = this._offset + 2;
          } else {
            address6 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['Module::comment', '"*)"']);
            }
          }
          if (address6 !== FAILURE) {
            elements0[2] = address6;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._comment[index0] = [address0, this._offset];
      return address0;
    }
  };

  var Parser = function(input, actions, types) {
    this._input = input;
    this._inputSize = input.length;
    this._actions = actions;
    this._types = types;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };

  Parser.prototype.parse = function() {
    var tree = this._read_module();
    if (tree !== FAILURE && this._offset === this._inputSize) {
      return tree;
    }
    if (this._expected.length === 0) {
      this._failure = this._offset;
      this._expected.push(['Module', '<EOF>']);
    }
    this.constructor.lastError = { offset: this._offset, expected: this._expected };
    throw new SyntaxError(formatError(this._input, this._failure, this._expected));
  };

  Object.assign(Parser.prototype, Grammar);


  function parse(input, options) {
    options = options || {};
    var parser = new Parser(input, options.actions, options.types);
    return parser.parse();
  }

  function formatError(input, offset, expected) {
    var lines = input.split(/\n/g),
        lineNo = 0,
        position = 0;

    while (position <= offset) {
      position += lines[lineNo].length + 1;
      lineNo += 1;
    }

    var line = lines[lineNo - 1],
        message = 'Line ' + lineNo + ': expected one of:\n\n';

    for (var i = 0; i < expected.length; i++) {
      message += '    - ' + expected[i][1] + ' from ' + expected[i][0] + '\n';
    }
    var number = lineNo.toString();
    while (number.length < 6) number = ' ' + number;
    message += '\n' + number + ' | ' + line + '\n';

    position -= line.length + 10;

    while (position < offset) {
      message += ' ';
      position += 1;
    }
    return message + '^';
  }

  function inherit(subclass, parent) {
    function chain () {};
    chain.prototype = parent.prototype;
    subclass.prototype = new chain();
    subclass.prototype.constructor = subclass;
  }


  var exported = { Grammar: Grammar, Parser: Parser, parse: parse };

  if (typeof require === 'function' && typeof exports === 'object') {
    Object.assign(exports, exported);
  } else {
    var ns = (typeof this === 'undefined') ? window : this;
    ns.Module = exported;
  }
})();
