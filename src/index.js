import './typedefs'

import MTNode from './nodes/mtn'
import Button from './nodes/button'
import A from './nodes/a'
import Article from './nodes/article'
import Aside from './nodes/aside'
import Div from './nodes/div'
import Footer from './nodes/footer'
import H from './nodes/h'
import Header from './nodes/header'
import I from './nodes/i'
import Main from './nodes/main'
import P from './nodes/p'
import Section from './nodes/section'
import Span from './nodes/span'
import Ul from './nodes/ul'
import Ol from './nodes/ol'
import Dl from './nodes/dl'
import Li from './nodes/li'
import Dt from './nodes/dt'
import Dd from './nodes/dd'
import Img from './nodes/img'
import Input from './nodes/input'
import Nav from './nodes/nav'
import Abbr from './nodes/abbr'
import Address from './nodes/address'
import Area from './nodes/area'
import Audio from './nodes/audio'
import B from './nodes/b'
import Base from './nodes/base'
import Bdi from './nodes/bdi'
import Bdo from './nodes/bdo'
import Blockquote from './nodes/blockquote'
import Body from './nodes/body'
import Br from './nodes/br'
import Canvas from './nodes/canvas'
import Caption from './nodes/caption'
import Cite from './nodes/cite'
import Code from './nodes/code'
import Col from './nodes/col'
import Colgroup from './nodes/colgroup'
import Data from './nodes/data'
import Datalist from './nodes/datalist'
import Del from './nodes/del'
import Details from './nodes/details'
import Dfn from './nodes/dfn'
import Dialog from './nodes/dialog'
import Em from './nodes/em'
import Embed from './nodes/embed'
import Fieldset from './nodes/fieldset'
import Figcaption from './nodes/figcaption'
import Figure from './nodes/figure'
import Form from './nodes/form'
import Head from './nodes/head'
import Hr from './nodes/hr'
import Html from './nodes/html'
import IFrame from './nodes/iframe'
import Ins from './nodes/ins'
import Kbd from './nodes/kbd'
import Label from './nodes/label'
import Legend from './nodes/legend'
import Link from './nodes/link'
import Map from './nodes/map'
import Mark from './nodes/mark'
import Meta from './nodes/meta'
import Meter from './nodes/meter'
import NoScript from './nodes/noscript'
import Object from './nodes/object'
import OptGroup from './nodes/optgroup'
import Option from './nodes/option'
import Output from './nodes/output'
import Param from './nodes/param'
import Picture from './nodes/picture'
import Pre from './nodes/pre'
import Progress from './nodes/progress'
import Q from './nodes/q'
import Rp from './nodes/rp'
import Rt from './nodes/rt'
import Rtc from './nodes/rtc'
import Ruby from './nodes/ruby'
import S from './nodes/s'
import Samp from './nodes/samp'
import Script from './nodes/script'
import Select from './nodes/select'
import Slot from './nodes/slot'
import Small from './nodes/small'
import Source from './nodes/source'
import Strong from './nodes/strong'
import Style from './nodes/style'
import Sub from './nodes/sub'
import Summary from './nodes/summary'
import Sup from './nodes/sup'
import Table from './nodes/table'
import TBody from './nodes/tbody'
import Td from './nodes/td'
import Template from './nodes/template'
import TextArea from './nodes/textarea'
import TFoot from './nodes/tfoot'
import Th from './nodes/th'
import THead from './nodes/thead'
import Time from './nodes/time'
import Title from './nodes/title'
import Tr from './nodes/tr'
import Track from './nodes/track'
import U from './nodes/u'
import Var from './nodes/var'
import Video from './nodes/video'
import Wbr from './nodes/wbr'
import Custom from './nodes/custom'

/**
 * Render [MTNode] node or nodes and its derivate nodes as element or elements.
 * @param {string} to css selector - html element where [elementOrElements] will be rendered.
 * @param {MTNode|MTNode[]} nodeOrNodes node or nodes that renders to [to] tag
 */
export function render(to, nodeOrNodes) {
  /** @type {HTMLElement} */
  const toElement = document.querySelector(to)

  if (nodeOrNodes instanceof Array) {
    const elements = nodeOrNodes.map((node) => node.createElement())
    elements.forEach((element) => toElement.append(element))
  } else {
    toElement.append(nodeOrNodes.createElement())
  }
}

export {
  MTNode,
  Button,
  A,
  Article,
  Aside,
  Div,
  Footer,
  H,
  Header,
  I,
  Main,
  P,
  Section,
  Span,
  Ul,
  Li,
  Ol,
  Dl,
  Dt,
  Dd,
  Img,
  Input,
  Nav,
  Abbr,
  Address,
  Area,
  Audio,
  B,
  Base,
  Bdi,
  Bdo,
  Blockquote,
  Body,
  Br,
  Canvas,
  Caption,
  Cite,
  Code,
  Col,
  Colgroup,
  Data,
  Datalist,
  Del,
  Details,
  Dfn,
  Dialog,
  Em,
  Embed,
  Fieldset,
  Figcaption,
  Figure,
  Form,
  Head,
  Hr,
  Html,
  IFrame,
  Ins,
  Kbd,
  Label,
  Legend,
  Link,
  Map,
  Mark,
  Meta,
  Meter,
  NoScript,
  Object,
  OptGroup,
  Option,
  Output,
  Param,
  Picture,
  Pre,
  Progress,
  Q,
  Rp,
  Rt,
  Rtc,
  Ruby,
  S,
  Samp,
  Script,
  Select,
  Slot,
  Small,
  Source,
  Strong,
  Style,
  Sub,
  Summary,
  Sup,
  Table,
  TBody,
  Td,
  Template,
  TextArea,
  TFoot,
  Th,
  THead,
  Time,
  Title,
  Tr,
  Track,
  U,
  Var,
  Video,
  Wbr,
  Custom
}
