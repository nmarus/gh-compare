# gh-compare

```bash
Usage: gh-compare [options]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -o, --owner       Github organization or user name         [string] [required]
  -r, --repository  Github repository name                   [string] [required]
  -b, --base        Git BASE commit                          [string] [required]
  -h, --head        Git HEAD commit                          [string] [required]
```

```bash
node gh-compare.js --owner nmarus \
                   --repository gh-compare \
                   --base cf27000fd0ad6c9de5b23294e5c24479e025c9bf \
                   --head cdf290fb0d1614dcc9d2a66eae2af0223b2b885a
? Github Personal Access Token: ****************************************
2022-01-27T01:43:21Z nmarus@gmail.com Added gh action for node tests
```

## Building Standalone App

Optionally can be built as a standalone OS native application.

**NEXE Build Prerequisites:**

In order to build as a standalone app, the build machine must be setup with the steps requires for build node executable. The following link outlines the steps

* https://github.com/nodejs/node/blob/master/BUILDING.md#option-1-manual-install

**Build Steps:**

```bash
Usage: node build [options]

Options:
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -p, --platform  Platform name [win64, osx, linux, all]     [string] [required]
```

```bash
npm install --production=false
node build --platform win64
```

Binaries can be found in the `/dist` directory of project.

## License

The MIT License (MIT)

Copyright (c) 2022 Nicholas Marus <nmarus@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
