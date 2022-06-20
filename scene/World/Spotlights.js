//http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
//https://github.com/jeromeetienne/threex.volumetricspotlight

import {
    Matrix4,
    Mesh,
    Vector3,
    Color,
    DoubleSide,
    SpotLight,
    AdditiveBlending,
    ShaderMaterial,
    CylinderGeometry,
    Object3D,
} from "three"

export default class Spotlights {
    constructor() {
        this.container = new Object3D()

        var geometry = new CylinderGeometry(0.15, 2, 15, 32 * 2, 20, false);

        geometry.applyMatrix(new Matrix4().makeTranslation(0, -geometry.parameters.height / 2, 0));
        geometry.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));

        this.material = this.VolumetricSpotLightMaterial()

        this.mesh1 = new Mesh(geometry, this.material);

        this.light1 = new SpotLight('#aaaaaa', 1, 100, 0.2, 1)

        this.container.add(this.mesh1);
        this.container.position.set(
            0,
            5,
            0
        )

        this.light1.position.set(
            0,
            0,
            0
        )

        this.material.uniforms.spotPosition.value = this.container.position
        this.time = 0


        this.mesh1.lookAt(new Vector3(
            0,
            -1,
            0
        ))
    }

    VolumetricSpotLightMaterial() {
        // 
        var vertexShader = [
            'varying vec3 vNormal;',
            'varying vec3 vWorldPosition;',

            'void main(){',
            '// compute intensity',
            'vNormal		= normalize( normalMatrix * normal );',

            'vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );',
            'vWorldPosition		= worldPosition.xyz;',

            '// set gl_Position',
            'gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}',
        ].join('\n')
        var fragmentShader = [
            'varying vec3		vNormal;',
            'varying vec3		vWorldPosition;',

            'uniform vec3		lightColor;',

            'uniform vec3		spotPosition;',

            'uniform float		attenuation;',
            'uniform float		anglePower;',

            'void main(){',
            'float intensity;',

            'intensity	= distance(vWorldPosition, spotPosition)/attenuation;',
            'intensity	= 0.5 - clamp(intensity, 0.0, 1.0);',

            'vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));',
            'float angleIntensity	= 0.2 + pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );',
            'intensity	= intensity * angleIntensity;',

            'gl_FragColor	= vec4(lightColor+vec3(intensity*0.6), intensity);',
            '}',
        ].join('\n')

        var material = new ShaderMaterial({
            uniforms: {
                attenuation: {
                    type: "f",
                    value: 20
                },
                anglePower: {
                    type: "f",
                    value: 1.7
                },
                spotPosition: {
                    type: "v3",
                    value: new Vector3(0, 0, 0)
                },
                lightColor: {
                    type: "c",
                    value: new Color('white')
                },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: DoubleSide,
            blending: AdditiveBlending,
            transparent: true,
            depthWrite: false,
        });

        return material
    }

    update() {
        this.time += 0.01
    }

}
