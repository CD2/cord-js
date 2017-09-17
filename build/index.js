var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};import React from'react';import{inject,observer}from'mobx-react';import match from'./match';export default function({as='fetchIds'}={}){const cord=this;return Component=>{var _dec,_class;let ConnectedIdFetcher=(_dec=inject('cordStore'),_dec(_class=observer(_class=class ConnectedIdFetcher extends React.Component{constructor(...args){var _temp;return _temp=super(...args),this.fetcher=(scope,opts)=>{return this.props.cordStore.fetchIdsReturnPromise(cord,_extends({scope},opts)).then(data=>data[cord.table_name].ids)},_temp}render(){const props=_extends({},this.props);delete props.cordStore;return React.createElement(Component,_extends({},props,{[as]:this.fetcher}))}})||_class)||_class);return ConnectedIdFetcher}}
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};import React from'react';import{inject,observer}from'mobx-react';import defaultConnectIdsFactories from'./ids_factories';import match from'./match';export default function(connectIds){return Component=>{var _dec,_class;const getIdsRequest=match(connectIds,defaultConnectIdsFactories,'connectIds');const cord=this;let ConnectedIds=(_dec=inject('cordStore'),_dec(_class=observer(_class=class ConnectedIds extends React.Component{componentDidMount(){const idsRequest=getIdsRequest(this.props);Object.values(idsRequest).forEach(requestData=>{this.props.cordStore.fetchIds(cord,requestData)})}render(){const idsRequest=getIdsRequest(this.props);const{cordStore}=this.props;let loaded=true;const ids=Object.entries(idsRequest).reduce((ids,[prop_name,requestData])=>{if(!cordStore.idsLoaded(cord,requestData)){loaded=false;return ids}ids[prop_name]=[...cordStore.getIds(cord,requestData)];return ids},{});if(!loaded)return React.createElement('b',null,'LOADING IDS');const props=_extends({},this.props,ids);delete props.cordStore;return React.createElement(Component,props)}})||_class)||_class);return ConnectedIds}}
const whenConnectIdsIsObject=connectIds=>{return typeof connectIds==='object'?()=>connectIds:undefined};const whenConnectIdsIsFunction=connectIds=>typeof connectIds==='function'?props=>connectIds.call(null,props):undefined;const whenConnectIdsIsString=connectIds=>typeof connectIds==='string'?props=>({[`${connectIds}_ids`]:{scope:connectIds}}):undefined;const whenConnectIdsIsArray=connectIds=>Array.isArray(connectIds)?props=>connectIds.reduce((collected,scope)=>{collected[`${scope}_ids`]={scope};return collected},{}):undefined;const whenConnectIdsIsUndefined=connectIds=>connectIds===undefined?()=>({all_ids:{scope:'all'}}):undefined;export default[whenConnectIdsIsFunction,whenConnectIdsIsString,whenConnectIdsIsArray,whenConnectIdsIsUndefined,whenConnectIdsIsObject];
export default((arg,factories,name)=>{for(let i=0;i<factories.length;i++){const result=factories[i](arg);if(result!==undefined)return result}throw new Error(`invalid type of ${typeof arg} supplied for ${name}`)});
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};import React from'react';import{inject,observer}from'mobx-react';import match from'./match';import{idFactories,attributesFactories}from'./record_factories';export default function({id=this.defaultPropName,as=this.defaultAs,attributes=[],reloadAs='reload'}={}){const cord=this;const getId=match(id,idFactories,'connectRecordIds');const getAttributes=match(attributes,attributesFactories,'connectRecordAttributes');return Component=>{var _dec,_class;let ConnectedIds=(_dec=inject('cordStore'),_dec(_class=observer(_class=class ConnectedIds extends React.Component{constructor(...args){var _temp;return _temp=super(...args),this.fetch=(props=this.props,{reload=false}={})=>{const id=getId(props);const attributes=getAttributes(props);if(Array.isArray(id)){id.map(id=>this.props.cordStore.fetchRecord(cord,id,attributes,{reload}))}else{this.props.cordStore.fetchRecord(cord,id,attributes,{reload})}},this.reload=()=>{this.fetch({reload:true})},_temp}componentDidMount(){this.fetch()}componentWillReceiveProps(props){this.fetch(props)}render(){const id=getId(this.props);const attributes=getAttributes(this.props);console.log({as,id,attributes,record:this.props.cordStore.getRecord(cord,id)});if(Array.isArray(id)){let loaded=true;let records=[];id.forEach(id=>{if(!loaded||!this.props.cordStore.isRecordLoaded(cord,id,attributes))return loaded=false;records.push(this.props.cordStore.getRecord(cord,id))});const props=_extends({},this.props);delete props.cordStore;props[as]=records;props[reloadAs]=this.reload;return React.createElement(Component,props)}else{if(!this.props.cordStore.isRecordLoaded(cord,id,attributes))return React.createElement('b',null,'LOADING');const record=this.props.cordStore.getRecord(cord,id);const props=_extends({},this.props);delete props.cordStore;props[as]=record;props[reloadAs]=this.reload;return React.createElement(Component,props)}}})||_class)||_class);return ConnectedIds}}
const whenIdIsFunction=id=>typeof id==='function'?props=>id.call(null,props):undefined;const whenIdIsString=id=>typeof id==='string'?props=>props[id]:undefined;const whenIdIsNumber=id=>typeof id==='number'?props=>id:undefined;export const idFactories=[whenIdIsFunction,whenIdIsString,whenIdIsNumber];const whenAttributesIsFunction=attributes=>typeof attributes==='function'?props=>attributes.call(null,props):undefined;const whenAttributesIsArray=attributes=>Array.isArray(attributes)?props=>attributes:undefined;const whenAttributesIsString=attributes=>typeof attributes==='string'?props=>[attributes]:undefined;export const attributesFactories=[whenAttributesIsFunction,whenAttributesIsArray,whenAttributesIsString];
import React from'react';import connectIds from'./connections/ids';import connectIdFetcher from'./connections/id_fetcher';import connectRecord from'./connections/record';let Cord=class Cord{constructor(name,{path,table_name,prop,as}={}){this.connectIds=connectIds;this.connectIdFetcher=connectIdFetcher;this.connectRecord=connectRecord;this.name=name;this.path=path!==undefined?path:name;this.table_name=table_name!==undefined?table_name:name;this.defaultAs=as!==undefined?as:name;this.defaultPropName=prop!==undefined?prop:`${name}_id`}};export{Cord as default};
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _desc,_value,_class,_descriptor;function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.')}import{observable}from'mobx';import axios from'axios';const get=(url,params)=>axios.get(url,{params});const post=(url,data)=>axios.post(url,{data});const defaultHttp={get,post};let CordStore=(_class=class CordStore{constructor({base_url,http_methods,reducer_key='cord'}={}){this.http_methods=defaultHttp;this.request=(method,path,data)=>{const url=`${this.base_url}/${path}`;return this.http_methods[method](url,data).then(response=>{this.processResponse(response.data);return response.data})};this.get=(...args)=>{return this.request('get',...args)};this.post=(...args)=>{return this.request('post',...args)};_initDefineProp(this,'data',_descriptor,this);this.processResponse=data=>{Object.entries(data).forEach(([table_name,singleCordData])=>{const table_data=this.getTableData(table_name);if(singleCordData.hasOwnProperty('ids')){Object.entries(singleCordData.ids).map(([scope_name,ids])=>{table_data.ids.set(scope_name,ids)})}if(singleCordData.hasOwnProperty('records')){singleCordData.records.map(record=>{const record_data=table_data.records.get(record.id);const new_record=_extends({},record_data,record);table_data.records.set(record.id,new_record)})}})};this.base_url=base_url;this.reducer_key=reducer_key;this.http_methods=_extends({},this.http_methods,http_methods);window.store=this.data}idsPath(base_path){return`${base_path}/ids`}recordsPath(base_path){return base_path}actionsPath(base_path){return`${base_path}/perform`}getTableData(table_name){if(!this.data.hasOwnProperty(table_name)){this.data[table_name]={records:observable.shallowMap(),ids:observable.map()}}return this.data[table_name]}getDataKey(data){return JSON.stringify(data)}fetchIds(cord,data){if(!this.idsLoaded(cord,data)){const path=this.idsPath(cord.path);return this.get(path,data)}}fetchIdsReturnPromise(cord,data){return this.fetchIds(cord,data)||Promise.resolve(this.getIds(cord,data))}getIds(cord,data){return this.getTableData(cord.table_name).ids.get(data.scope)}idsLoaded(cord,data){console.log(data,this.getTableData(cord.table_name).ids);return this.getTableData(cord.table_name).ids.has(data.scope)}fetchRecord(cord,id,attributes=[],{reload=false}={}){if(reload||!this.isRecordLoaded(cord,id,attributes)){const path=this.recordsPath(cord.path);this.get(path,{ids:id,attributes})}}getRecord(cord,id){return this.getTableData(cord.table_name).records.get(id)}isRecordLoaded(cord,id,attributes=[]){const{records}=this.getTableData(cord.table_name);if(!records.has(id))return false;const loaded_attributes=Object.keys(records.get(id));return attributes.every(attr=>loaded_attributes.includes(attr))}},(_descriptor=_applyDecoratedDescriptor(_class.prototype,'data',[observable],{enumerable:true,initializer:function(){return{}}})),_class);export{CordStore as default};
export{default as CordStore}from'./cord_store';export{default as Cord}from'./cord';export{default as Provider}from'./provider';
var _class,_temp;import React from'react';import PropTypes from'prop-types';import{Provider}from'mobx-react';import CordStore from'./cord_store';let CordProvider=(_temp=_class=class CordProvider extends React.Component{render(){const{children,store}=this.props;return React.createElement(Provider,{cordStore:store},React.Children.only(children))}},_class.propTypes={store:PropTypes.instanceOf(CordStore).isRequired,children:PropTypes.node.isRequired},_temp);export{CordProvider as default};
