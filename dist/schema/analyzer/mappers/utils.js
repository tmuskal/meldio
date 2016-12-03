'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ASTHelpers = ASTHelpers;

var _languageKinds = require('../../language/kinds');

var _definitions = require('../definitions');

function ASTHelpers(context) {

  var isRequiredField = function isRequiredField(fieldAST) {
    return fieldAST.type.kind === _languageKinds.NON_NULL_TYPE;
  };

  var isEnumField = function isEnumField(_x) {
    var _left;

    var _again = true;

    _function: while (_again) {
      var fieldAST = _x;
      _again = false;

      if (_left = fieldAST.type.kind === _languageKinds.NAMED_TYPE && context.schema[fieldAST.type.name.value] && context.schema[fieldAST.type.name.value].kind === 'enum') {
        return _left;
      }

      if (!(_left = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left;
      }

      _x = fieldAST.type;
      _again = true;
      continue _function;
    }
  };

  // scalars are SCALAR_TYPES, enums and NonNull instances of those two
  var isScalarField = function isScalarField(_x2) {
    var _left2;

    var _again2 = true;

    _function2: while (_again2) {
      var fieldAST = _x2;
      _again2 = false;

      if (_left2 = fieldAST.type.kind === _languageKinds.NAMED_TYPE && (_definitions.SCALAR_TYPES.includes(fieldAST.type.name.value) || isEnumField(fieldAST))) {
        return _left2;
      }

      if (!(_left2 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left2;
      }

      _x2 = fieldAST.type;
      _again2 = true;
      continue _function2;
    }
  };

  var getScalarType = function getScalarType(_x3) {
    var _again3 = true;

    _function3: while (_again3) {
      var fieldAST = _x3;
      _again3 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x3 = fieldAST.type;
        _again3 = true;
        continue _function3;
      } // else if (fieldAST.type.kind === NAMED_TYPE) {
      return fieldAST.type.name.value;
    }
  };

  // numerics are Int, Float and NonNull insances of those
  var isNumericField = function isNumericField(_x4) {
    var _left3;

    var _again4 = true;

    _function4: while (_again4) {
      var fieldAST = _x4;
      _again4 = false;

      if (_left3 = fieldAST.type.kind === _languageKinds.NAMED_TYPE && _definitions.NUMERIC_TYPES.includes(fieldAST.type.name.value)) {
        return _left3;
      }

      if (!(_left3 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left3;
      }

      _x4 = fieldAST.type;
      _again4 = true;
      continue _function4;
    }
  };

  var getNumericType = function getNumericType(_x5) {
    var _again5 = true;

    _function5: while (_again5) {
      var fieldAST = _x5;
      _again5 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x5 = fieldAST.type;
        _again5 = true;
        continue _function5;
      } // else if (fieldAST.type.kind === NAMED_TYPE) {
      return fieldAST.type.name.value;
    }
  };

  var isEdgeField = function isEdgeField(_x6) {
    var _left4;

    var _again6 = true;

    _function6: while (_again6) {
      var fieldAST = _x6;
      _again6 = false;

      if (_left4 = fieldAST.type.kind === _languageKinds.EDGE_DEFINITION) {
        return _left4;
      }

      if (!(_left4 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left4;
      }

      _x6 = fieldAST.type;
      _again6 = true;
      continue _function6;
    }
  };

  var getEdgeFieldType = function getEdgeFieldType(_x7) {
    var _again7 = true;

    _function7: while (_again7) {
      var fieldAST = _x7;
      _again7 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x7 = fieldAST.type;
        _again7 = true;
        continue _function7;
      }
      return fieldAST.type.type.name.value;
    }
  };

  var getEdgeFieldEdgeType = function getEdgeFieldEdgeType(_x8) {
    var _again8 = true;

    _function8: while (_again8) {
      var fieldAST = _x8;
      _again8 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x8 = fieldAST.type;
        _again8 = true;
        continue _function8;
      }
      return fieldAST.type.edgeType ? fieldAST.type.edgeType.name.value : null;
    }
  };

  var CONNECTION_DEFINITION_KINDS = [_languageKinds.NODE_CONNECTION_DEFINITION, _languageKinds.SCALAR_CONNECTION_DEFINITION, _languageKinds.OBJECT_CONNECTION_DEFINITION];

  // Connection can be NodeConnection, ObjectConnection or ScalarConnection
  var isConnectionField = function isConnectionField(_x9) {
    var _left5;

    var _again9 = true;

    _function9: while (_again9) {
      var fieldAST = _x9;
      _again9 = false;

      if (_left5 = CONNECTION_DEFINITION_KINDS.includes(fieldAST.type.kind)) {
        return _left5;
      }

      if (!(_left5 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left5;
      }

      _x9 = fieldAST.type;
      _again9 = true;
      continue _function9;
    }
  };

  var getConnectionType = function getConnectionType(_x10) {
    var _again10 = true;

    _function10: while (_again10) {
      var fieldAST = _x10;
      _again10 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x10 = fieldAST.type;
        _again10 = true;
        continue _function10;
      } // else if (fieldAST.type.kind in CONNECTION_DEFINITION_KINDS)
      return fieldAST.type;
    }
  };

  var getConnectionRelatedField = function getConnectionRelatedField(_x11) {
    var _again11 = true;

    _function11: while (_again11) {
      var fieldAST = _x11;
      _again11 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x11 = fieldAST.type;
        _again11 = true;
        continue _function11;
      }
      return fieldAST.type.relatedField ? fieldAST.type.relatedField.value : null;
    }
  };

  var getConnectionEdgeType = function getConnectionEdgeType(_x12) {
    var _again12 = true;

    _function12: while (_again12) {
      var fieldAST = _x12;
      _again12 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x12 = fieldAST.type;
        _again12 = true;
        continue _function12;
      }
      return fieldAST.type.edgeType ? fieldAST.type.edgeType.name.value : null;
    }
  };

  var isScalarConnectionField = function isScalarConnectionField(_x13) {
    var _left6;

    var _again13 = true;

    _function13: while (_again13) {
      var fieldAST = _x13;
      _again13 = false;

      if (_left6 = fieldAST.type.kind === _languageKinds.SCALAR_CONNECTION_DEFINITION) {
        return _left6;
      }

      if (!(_left6 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left6;
      }

      _x13 = fieldAST.type;
      _again13 = true;
      continue _function13;
    }
  };

  var isObjectConnectionField = function isObjectConnectionField(_x14) {
    var _left7;

    var _again14 = true;

    _function14: while (_again14) {
      var fieldAST = _x14;
      _again14 = false;

      if (_left7 = fieldAST.type.kind === _languageKinds.OBJECT_CONNECTION_DEFINITION) {
        return _left7;
      }

      if (!(_left7 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left7;
      }

      _x14 = fieldAST.type;
      _again14 = true;
      continue _function14;
    }
  };

  var isNodeConnectionField = function isNodeConnectionField(_x15) {
    var _left8;

    var _again15 = true;

    _function15: while (_again15) {
      var fieldAST = _x15;
      _again15 = false;

      if (_left8 = fieldAST.type.kind === _languageKinds.NODE_CONNECTION_DEFINITION) {
        return _left8;
      }

      if (!(_left8 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left8;
      }

      _x15 = fieldAST.type;
      _again15 = true;
      continue _function15;
    }
  };

  var isListField = function isListField(_x16) {
    var _left9;

    var _again16 = true;

    _function16: while (_again16) {
      var fieldAST = _x16;
      _again16 = false;

      if (_left9 = fieldAST.type.kind === _languageKinds.LIST_TYPE) {
        return _left9;
      }

      if (!(_left9 = fieldAST.type.kind === _languageKinds.NON_NULL_TYPE)) {
        return _left9;
      }

      _x16 = fieldAST.type;
      _again16 = true;
      continue _function16;
    }
  };

  var isObjectField = function isObjectField(fieldAST) {
    return !isConnectionField(fieldAST) && !isEdgeField(fieldAST) && !isListField(fieldAST) && !isScalarField(fieldAST);
  };

  var getListType = function getListType(_x17) {
    var _again17 = true;

    _function17: while (_again17) {
      var fieldAST = _x17;
      _again17 = false;

      if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x17 = fieldAST.type;
        _again17 = true;
        continue _function17;
      } // else if (fieldAST.type.kind === LIST_TYPE)
      return fieldAST.type;
    }
  };

  var getObjectType = function getObjectType(_x18) {
    var _again18 = true;

    _function18: while (_again18) {
      var fieldAST = _x18;
      _again18 = false;

      if (fieldAST.type.kind === _languageKinds.NAMED_TYPE) {
        return fieldAST.type.name.value;
      } else if (fieldAST.type.kind === _languageKinds.NON_NULL_TYPE) {
        _x18 = fieldAST.type;
        _again18 = true;
        continue _function18;
      }
    }
  };

  var isListOfScalarField = function isListOfScalarField(fieldAST) {
    return isListField(fieldAST) && isScalarField(getListType(fieldAST));
  };

  // this will catch lists of lists (on purpose), interfaces, types and unions
  var isListOfObjectField = function isListOfObjectField(fieldAST) {
    return isListField(fieldAST) && !isScalarField(getListType(fieldAST));
  };

  return {
    isRequiredField: isRequiredField,
    isEnumField: isEnumField,
    isScalarField: isScalarField,
    getScalarType: getScalarType,
    isNumericField: isNumericField,
    getNumericType: getNumericType,
    isEdgeField: isEdgeField,
    getEdgeFieldType: getEdgeFieldType,
    getEdgeFieldEdgeType: getEdgeFieldEdgeType,
    isConnectionField: isConnectionField,
    getConnectionType: getConnectionType,
    getConnectionRelatedField: getConnectionRelatedField,
    getConnectionEdgeType: getConnectionEdgeType,
    isScalarConnectionField: isScalarConnectionField,
    isObjectConnectionField: isObjectConnectionField,
    isNodeConnectionField: isNodeConnectionField,
    isListField: isListField,
    isObjectField: isObjectField,
    getListType: getListType,
    getObjectType: getObjectType,
    isListOfScalarField: isListOfScalarField,
    isListOfObjectField: isListOfObjectField
  };
}