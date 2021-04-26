import React, { Component } from 'react';

export default class CellText extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }


    getDefaultByType(Type)
    {
        switch (Type) {
            case 'int':
                return 0;

            case 'flaot':
                return 0.00;

            case 'bool':
                return false;

            case 'array':
                return [];

            case 'object':
                return {};

            default:
                return '';
        }
    }


    getDefault(Type, Default)
    {
        if (typeof Default == 'undefined') {
            return this.getDefaultByType(Type);
        } else {
            return Default;
        }
    }


    getProperty(Property, Type, Default=undefined)
    {
        if (typeof this.props[Property] == Type) {
            return this.props[Property];
        } else {
            return this.getDefault(Type, Default);
        }
    }


    getClassString()
    {
        let ClassArray = this.getProperty('ClassArray', 'array');

        const ClassString = ClassArray.join(' ');

        return ClassString;
    }


    render()
    {
        return (
          <span
            key={this.getProperty('KeyProp', 'string')}
            className={this.getClassString()}
            >{this.getProperty('Text', 'string')}</span>
        );
    }
}