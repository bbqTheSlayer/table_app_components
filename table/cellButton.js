import React, { Component } from 'react';

export default class CellButton extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }


    getDefaultByType(Type)
    {
        switch (Type) {
            case 'number':
                return 0;

            case 'boolean':
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
        let ClassArray = this.getProperty('ClassArray', 'object');

        const ClassString = ClassArray.join(' ');

        return ClassString;
    }


    handleClick(e)
    {
        if (typeof this.props.onClick == 'function') {
            this.props.onClick(e, this.getProperty('RowData', 'object'));
        }
    }


    render() {
        return (
          <button
            key={this.getProperty('KeyProp', 'string')}
            className={this.getClassString()}
            disabled={this.getProperty('IsDisabled', 'boolean')}
            onClick={(e) => {
                this.handleClick(e);
            }}
            >{this.props.Caption}</button>
        );
    }
}