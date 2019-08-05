/*
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @category animation
 */

import { INode } from '../core/utils/interfaces';
import { Vec3, Quat } from '../core/math';

export function getPathFromRoot (target: INode | null, root: INode) {
    let node: INode | null = target;
    let path = '';
    while (node !== null && node !== root) {
        path = `${node.name}/${path}`;
        node = node.parent;
    }
    return path.slice(0, -1);
}

export function getWorldTransformUntilRoot (target: INode, root: INode, outPos: Vec3, outRot: Quat, outScale: Vec3) {
    Vec3.set(outPos, 0, 0, 0);
    Quat.set(outRot, 0, 0, 0, 1);
    Vec3.set(outScale, 1, 1, 1);
    while (target !== root) {
        Vec3.multiply(outPos, outPos, target.scale);
        Vec3.transformQuat(outPos, outPos, target.rotation);
        Vec3.add(outPos, outPos, target.position);
        Quat.multiply(outRot, target.rotation, outRot);
        Vec3.multiply(outScale, target.scale, outScale);
        target = target.parent!;
    }
}