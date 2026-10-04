import { Component, State, h } from '@stencil/core';
import { formatHex, formatHsl, formatOklch, formatRgb, parseColor, Rgb } from '../../utils/color';

const DEFAULT = '#3b82f6'

@Component({
  tag: 'app-color'
})
export class AppColor {
  picker: HTMLInputElement

  @State() input = DEFAULT
  @State() value = ''
  @State() swatch = ''
  @State() hex = DEFAULT

  componentWillLoad() {
    this.transform(DEFAULT)
  }

  // Named colors such as "rebeccapurple" are resolved by the browser
  parse(text: string): Rgb | null {
    const color = parseColor(text)
    if (color) {
      return color
    }
    const context = document.createElement('canvas').getContext('2d')
    const resolve = (fallback: string) => {
      context.fillStyle = fallback
      context.fillStyle = text
      return context.fillStyle as string
    }
    const resolved = resolve('#000000')
    return resolved === resolve('#ffffff') ? parseColor(resolved) : null
  }

  openPicker(event: MouseEvent) {
    // Clicking the label should not open the picker
    if ((event.target as HTMLElement).tagName === 'INPUT') {
      this.picker.showPicker()
    }
  }

  transform(text: string) {
    this.input = text
    if (!text.trim()) {
      this.value = ''
      this.swatch = ''
      return
    }
    const color = this.parse(text.trim())
    if (!color) {
      this.value = 'Not a color'
      this.swatch = ''
      return
    }
    this.swatch = formatRgb(color)
    // The native picker only understands opaque #rrggbb values
    this.hex = formatHex({ ...color, a: 1 })
    this.value = [formatHex(color), formatRgb(color), formatHsl(color), formatOklch(color)].join('\n')
  }

  render() {
    return (
      <div>
        <app-info
          title="Color Converter"
          description="Click to pick a color, or type hex, rgb(), hsl(), oklch() or a named color"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="w-1/2"
            label="Color"
            value={this.input}
            onTransform={(e) => this.transform(e.detail)}
            onClick={(e) => this.openPicker(e)}
          >
          </app-field>
          <div class="relative w-24 h-10 border border-gray-400 rounded" style={{ backgroundColor: this.swatch }}>
            <input
              type="color"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={this.hex}
              ref={(el) => this.picker = el}
              onInput={(event:any) => this.transform(event.target.value)}
            />
          </div>
        </div>

        <app-output
          label="Formats"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
