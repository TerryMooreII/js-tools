import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-query-string-to-json'
})
export class AppQueryStringToJson {
  @State() value: any

  parseValue(value) {
    console.log(value)
    if (value === null) return null
    if (value === undefined || value === '') return undefined 
    const number = Number(value)
    return Number.isNaN(number) 
      ? decodeURIComponent(value)
      : number
  }

  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    let queryString = {}
    if (e.detail.includes('?')){
      [, queryString] = e.detail.split('?')
    } else {
      queryString = e.detail
    }
    const searchParams = new URLSearchParams(queryString)
    const obj = {}
    //@ts-ignore
    for(const [key, value] of searchParams.entries()) {
      if (key in obj && !Array.isArray(obj[key])) {
        const temp = obj[key]
        obj[key] = [temp]
        obj[key].push(this.parseValue(value))
      } else if(Array.isArray(obj[key])) {
        obj[key].push(this.parseValue(value))
      }else {
        obj[key] = this.parseValue(value)
      }
    }
    this.value = JSON.stringify(obj, null, 2)
  }

  render() {
    return (
      <div>
        <app-info
          title="Query String to JSON"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="Query String"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label="JSON"
          value={this.value}
          highlight="json"
        >
        </app-output>
       </div>
      </div>
    )
  }
}