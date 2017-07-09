module.exports = {
    "sys_pair": {
        "params": [
            {
                "name": "v1"
            },
            {
                "name": "v2"
            }
        ],
        "parser": {}
    },
    "sys_void": {
        "params": [],
        "parser": {
            "type": "atom",
            "value": null
        }
    },
    "sys_data": {
        "params": [
            {
                "name": "data"
            }
        ],
        "parser": {
            "type": "bypass"
        }
    },
    "sys_number": {
        "params": [
            {
                "name": "data"
            }
        ],
        "parser": {
            "type": "atom_fun"
        }
    },
    "sys_null": {
        "params": [],
        "parser": {
            "type": "atom",
            "value": null
        }
    },
    "sys_true": {
        "params": [],
        "parser": {
            "type": "atom",
            "value": true
        }
    },
    "sys_false": {
        "params": [],
        "parser": {
            "type": "atom",
            "value": false
        }
    },
    "sys_string": {
        "params": [
            {
                "name": "data"
            }
        ],
        "parser": {
            "type": "atom_fun"
        }
    },
    "sys_array": {
        "params": [
            {
                "name": "list",
                "type": "Pairs"
            }
        ],
        "parser": {}
    },
    "sys_object": {
        "params": [
            {
                "name": "list",
                "type": "Pairs"
            }
        ],
        "parser": {}
    },
    "sys_metaMethod": {
        "params": [],
        "parser": {}
    },
    "sys_application": {
        "params": [
            {
                "name": "caller"
            },
            {
                "name": "params",
                "type": "Pairs"
            }
        ],
        "parser": {
            "type": "transform"
        }
    },
    "sys_ordinary_abstraction": {
        "params": [
            {
                "name": "variables",
                "type": "Pairs"
            },
            {
                "name": "body"
            },
            {
                "def": null,
                "name": "context"
            },
            {
                "def": {},
                "name": "indexMap"
            },
            {
                "def": {},
                "name": "fillMap"
            },
            {
                "def": 0,
                "name": "fillCount"
            }
        ],
        "parser": {
            "type": "bind_context"
        }
    },
    "sys_variable": {
        "params": [
            {
                "name": "variableName"
            }
        ],
        "parser": {}
    },
    "sys_exp": {
        "params": [
            {
                "name": "expression"
            }
        ],
        "parser": {
            "type": "bypass"
        }
    },
    "sys_statements": {
        "params": [
            {
                "name": "statements",
                "type": "Pairs"
            }
        ],
        "parser": {}
    },
    "sys_letBinding": {
        "params": [
            {
                "name": "bindings",
                "type": "Pairs"
            }
        ],
        "parser": {}
    },
    "sys_import": {
        "params": [
            {
                "name": "modulePath"
            },
            {
                "name": "variable"
            }
        ],
        "parser": {}
    },
    "sys_condition": {
        "params": [
            {
                "name": "conditionExp"
            },
            {
                "name": "option1Exp"
            },
            {
                "name": "option2Exp"
            }
        ],
        "parser": {
            "type": "transform"
        }
    },
    "sys_guarded_abstraction_line": {
        "params": [
            {
                "name": "ordinaryAbstraction"
            },
            {
                "name": "guards",
                "type": "Pairs"
            }
        ],
        "parser": {}
    },
    "sys_guarded_abstraction": {
        "params": [
            {
                "name": "guardLines",
                "type": "Pairs"
            },
            {
                "def": null,
                "name": "context"
            }
        ],
        "parser": {
            "type": "bind_context"
        }
    },
    "sys_identity": {
        "params": [
            {
                "name": "value"
            }
        ],
        "parser": {
            "type": "id"
        }
    },
    "sys_import_statement_middle": {
        "params": [],
        "parser": {
            "type": "rewrite"
        }
    },
    "sys_let_statement_middle": {
        "params": [],
        "parser": {
            "type": "rewrite"
        }
    },
    "sys_apply_guarded_abstraction": {
        "params": [],
        "parser": {}
    },
    "sys_apply_ordinary_abstraction": {
        "params": [],
        "parser": {}
    },
    "sys_apply_meta_method": {
        "params": [],
        "parser": {}
    }
}