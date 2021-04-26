import React, { Component } from 'react';

import BaseInput from '../base/input';

import BaseSelect from '../base/select';

import BaseTextArea from '../base/textArea';

import BaseDateTime from '../base/dateTime';

import BaseCheckbox from '../base/checkbox';

import BaseInputImage from '../base/inputImage';

export default class InputSet extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }


    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.id || Row.ID), Caption: Row[CaptionField]};
        });
    }


    getSafeDataList(DataList)
    {
        if (typeof DataList == 'object') {
            return DataList;
        } else {
            return [];
        }
    }


    createSelect(Control)
    {
        const OptionList = this.prepareOptionList(
            this.getSafeDataList(this.props.State[Control.DataSet]),
            Control.CaptionFieldName
        );

        return (
            <BaseSelect
              className="form-control"
              key={Control.CurrentValueVar}
              OptionList={OptionList}
              DefaultCaption={Control.DefaultCaption}
              DefaultValue={Control.DefaultValue}
              isDisabled={Control.disabled}
              value={this.props.State[Control.CurrentValueVar]}
              onChange={(Val) => {
                //   console.log(Control.CurrentValueVar);
                  this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        );
    }



    createInputImage(Control)
    {
        return (
            <BaseInputImage
              KeyProp={Control.CurrentValueVar}
              value={this.props.State[Control.CurrentValueVar]}
              ClassArray={Control.ClassArray}
              TextHint={Control.placeholder}
              IsDisabled={Control.Disabled}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }



    createInput(Control)
    {
        return (
            <BaseInput
              KeyProp={Control.CurrentValueVar}
              value={this.props.State[Control.CurrentValueVar]}
              ClassArray={Control.ClassArray}
              TextHint={Control.placeholder}
              IsDisabled={Control.Disabled}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }



    createTextarea(Control)
    {
        return (
            <BaseTextArea
              key={Control.CurrentValueVar}
              value={this.props.State[Control.CurrentValueVar]}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }



    createDatetime(Control)
    {
        return (
            <BaseDateTime
              key={Control.CurrentValueVar}
              value={this.props.State[Control.CurrentValueVar]}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }



    createCheckbox(Control)
    {
        return (
            <BaseCheckbox
              key={Control.CurrentValueVar}
              checked={this.props.State[Control.CurrentValueVar]}
              IsDisabled={Control.Disabled}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }



    renderSelect(Control, i)
    {
        const Component = this.createSelect(Control);

        return (
            <div className="row form-group" key={'filter_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>
                    
                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    renderInput(Control, i)
    {
        const Component = this.createInput(Control);

        return (
            <div className="row form-group" key={'input_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    renderInputImage(Control, i)
    {
        const Component = this.createInputImage(Control);

        return (
            <div className="row form-group" key={'input_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    renderCheckbox(Control, i)
    {
        const Component = this.createCheckbox(Control);

        return (
            <div className="row form-group" key={'checkbox_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    renderTextarea(Control, i)
    {
        const Component = this.createTextarea(Control);

        return (
            <div className="row form-group" key={'textarea_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    renderDatetime(Control, i)
    {
        const Component = this.createDatetime(Control);

        return (
            <div className="row form-group" key={'datetime_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }



    getFieldList()
    {
        if (typeof this.props.FieldConfig == 'object') {
            return this.props.FieldConfig;
        } else {
            return [];
        }
    }



    renderFilterSet()
    {
        const FieldList = this.getFieldList();

        return FieldList.map((Row, i) => {
            switch (Row.type) {
                case 'select':
                    return this.renderSelect(Row, i);

                case 'input':
                    return this.renderInput(Row, i);

                case 'textarea':
                    return this.renderTextarea(Row, i);

                case 'datetime':
                    return this.renderDatetime(Row, i);

                case 'checkbox':
                    return this.renderCheckbox(Row, i);

                case 'inputimage':
                    return this.renderInputImage(Row, i);
            }
        });
    }



    render()
    {
        const Filters = this.renderFilterSet();

        return(
            <>
            {Filters}
            </>
        )
    }

}