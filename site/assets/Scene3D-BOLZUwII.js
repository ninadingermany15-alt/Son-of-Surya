import{a as h,j as r}from"./query-YQf5_TCb.js";import{R as fe,I as we,F as oe,a as K,b as B,W as Se,B as Y,S as ue,V as w,c as me,U as Q,d as se,e as R,M as be,f as D,L as Me,g as _e,h as he,u as Z,C as N,_ as V,i as je,j as Ee,P as Pe,k as ee,l as Le,m as Ae,n as te,O as ze,D as Ce,E as Ue,T as Be,o as pe,p as De}from"./OrbitControls-BwdWe60y.js";import{s as Te}from"./Studio-CwLYy-2J.js";import"./radix-ui-BwGFl6CB.js";import"./react-vendor-C-zWn88Y.js";import"./index-CNp9AM-u.js";import"./catalog-D2EB3Q5L.js";import"./equipment-Bv5fOCc8.js";import"./engine-DraTwOPv.js";import"./finance-Bp6tpoHL.js";import"./exporters-Ber0sC29.js";import"./defaults-EkDlQAg-.js";import"./loader-circle-BjTszJ12.js";import"./circle-check-Ze_Zf6oq.js";import"./triangle-alert-DS-O1Rdc.js";import"./brand-CkDV68oe.js";import"./account-Ce_OhLh0.js";import"./badge-check-DZkQm0mI.js";import"./info-Bz9bGFn5.js";import"./satellite-w3QFIDmP.js";import"./sun-BlZAOjKp.js";import"./sparkles-CD3vROc6.js";import"./download-CdL4IEJQ.js";import"./tractor-fDT9LNbB.js";import"./sprout-BiOPHB-0.js";import"./building-2-BNjyr3iL.js";import"./house-BI5QqJue.js";const ge=parseInt(fe.replace(/\D+/g,"")),xe=ge>=125?"uv1":"uv2",re=new Y,H=new w;class ne extends we{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new oe(e,3)),this.setAttribute("uv",new oe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,o=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),o.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const o=new K(t,6,1);return this.setAttribute("instanceStart",new B(o,3,0)),this.setAttribute("instanceEnd",new B(o,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const i=new K(o,t*2,1);return this.setAttribute("instanceColorStart",new B(i,t,0)),this.setAttribute("instanceColorEnd",new B(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Se(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Y);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),re.setFromBufferAttribute(t),this.boundingBox.union(re))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ue),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let s=0,a=e.count;s<a;s++)H.fromBufferAttribute(e,s),i=Math.max(i,o.distanceToSquared(H)),H.fromBufferAttribute(t,s),i=Math.max(i,o.distanceToSquared(H));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class ve extends ne{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,o=new Float32Array(2*t);for(let i=0;i<t;i+=3)o[2*i]=e[i],o[2*i+1]=e[i+1],o[2*i+2]=e[i+2],o[2*i+3]=e[i+3],o[2*i+4]=e[i+4],o[2*i+5]=e[i+5];return super.setPositions(o),this}setColors(e,t=3){const o=e.length-t,i=new Float32Array(2*o);if(t===3)for(let s=0;s<o;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5];else for(let s=0;s<o;s+=t)i[2*s]=e[s],i[2*s+1]=e[s+1],i[2*s+2]=e[s+2],i[2*s+3]=e[s+3],i[2*s+4]=e[s+4],i[2*s+5]=e[s+5],i[2*s+6]=e[s+6],i[2*s+7]=e[s+7];return super.setColors(i,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class ie extends me{constructor(e){super({type:"LineMaterial",uniforms:Q.clone(Q.merge([se.common,se.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new R(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${ge>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const $=new D,ae=new w,le=new w,b=new D,M=new D,P=new D,X=new w,J=new _e,_=new Me,ce=new w,k=new Y,F=new ue,L=new D;let A,U;function de(n,e,t){return L.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),L.multiplyScalar(1/L.w),L.x=U/t.width,L.y=U/t.height,L.applyMatrix4(n.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}function Oe(n,e){const t=n.matrixWorld,o=n.geometry,i=o.attributes.instanceStart,s=o.attributes.instanceEnd,a=Math.min(o.instanceCount,i.count);for(let l=0,c=a;l<c;l++){_.start.fromBufferAttribute(i,l),_.end.fromBufferAttribute(s,l),_.applyMatrix4(t);const f=new w,u=new w;A.distanceSqToSegment(_.start,_.end,u,f),u.distanceTo(f)<U*.5&&e.push({point:u,pointOnLine:f,distance:A.origin.distanceTo(u),object:n,face:null,faceIndex:l,uv:null,[xe]:null})}}function Ge(n,e,t){const o=e.projectionMatrix,s=n.material.resolution,a=n.matrixWorld,l=n.geometry,c=l.attributes.instanceStart,f=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),p=-e.near;A.at(1,P),P.w=1,P.applyMatrix4(e.matrixWorldInverse),P.applyMatrix4(o),P.multiplyScalar(1/P.w),P.x*=s.x/2,P.y*=s.y/2,P.z=0,X.copy(P),J.multiplyMatrices(e.matrixWorldInverse,a);for(let x=0,S=u;x<S;x++){if(b.fromBufferAttribute(c,x),M.fromBufferAttribute(f,x),b.w=1,M.w=1,b.applyMatrix4(J),M.applyMatrix4(J),b.z>p&&M.z>p)continue;if(b.z>p){const m=b.z-M.z,y=(b.z-p)/m;b.lerp(M,y)}else if(M.z>p){const m=M.z-b.z,y=(M.z-p)/m;M.lerp(b,y)}b.applyMatrix4(o),M.applyMatrix4(o),b.multiplyScalar(1/b.w),M.multiplyScalar(1/M.w),b.x*=s.x/2,b.y*=s.y/2,M.x*=s.x/2,M.y*=s.y/2,_.start.copy(b),_.start.z=0,_.end.copy(M),_.end.z=0;const d=_.closestPointToPointParameter(X,!0);_.at(d,ce);const j=he.lerp(b.z,M.z,d),E=j>=-1&&j<=1,z=X.distanceTo(ce)<U*.5;if(E&&z){_.start.fromBufferAttribute(c,x),_.end.fromBufferAttribute(f,x),_.start.applyMatrix4(a),_.end.applyMatrix4(a);const m=new w,y=new w;A.distanceSqToSegment(_.start,_.end,y,m),t.push({point:y,pointOnLine:m,distance:A.origin.distanceTo(y),object:n,face:null,faceIndex:x,uv:null,[xe]:null})}}}class ye extends be{constructor(e=new ne,t=new ie({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,o=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,l=0,c=t.count;a<c;a++,l+=2)ae.fromBufferAttribute(t,a),le.fromBufferAttribute(o,a),i[l]=l===0?0:i[l-1],i[l+1]=i[l]+ae.distanceTo(le);const s=new K(i,2,1);return e.setAttribute("instanceDistanceStart",new B(s,1,0)),e.setAttribute("instanceDistanceEnd",new B(s,1,1)),this}raycast(e,t){const o=this.material.worldUnits,i=e.camera;i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;A=e.ray;const a=this.matrixWorld,l=this.geometry,c=this.material;U=c.linewidth+s,l.boundingSphere===null&&l.computeBoundingSphere(),F.copy(l.boundingSphere).applyMatrix4(a);let f;if(o)f=U*.5;else{const p=Math.max(i.near,F.distanceToPoint(A.origin));f=de(i,p,c.resolution)}if(F.radius+=f,A.intersectsSphere(F)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),k.copy(l.boundingBox).applyMatrix4(a);let u;if(o)u=U*.5;else{const p=Math.max(i.near,k.distanceToPoint(A.origin));u=de(i,p,c.resolution)}k.expandByScalar(u),A.intersectsBox(k)!==!1&&(o?Oe(this,t):Ge(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport($),this.material.uniforms.resolution.value.set($.z,$.w))}}class Ie extends ye{constructor(e=new ve,t=new ie({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Re=h.forwardRef(function({points:e,color:t=16777215,vertexColors:o,linewidth:i,lineWidth:s,segments:a,dashed:l,...c},f){var u,p;const x=Z(E=>E.size),S=h.useMemo(()=>a?new ye:new Ie,[a]),[v]=h.useState(()=>new ie),d=(o==null||(u=o[0])==null?void 0:u.length)===4?4:3,j=h.useMemo(()=>{const E=a?new ne:new ve,z=e.map(m=>{const y=Array.isArray(m);return m instanceof w||m instanceof D?[m.x,m.y,m.z]:m instanceof R?[m.x,m.y,0]:y&&m.length===3?[m[0],m[1],m[2]]:y&&m.length===2?[m[0],m[1],0]:m});if(E.setPositions(z.flat()),o){t=16777215;const m=o.map(y=>y instanceof N?y.toArray():y);E.setColors(m.flat(),d)}return E},[e,a,o,d]);return h.useLayoutEffect(()=>{S.computeLineDistances()},[e,S]),h.useLayoutEffect(()=>{l?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[l,v]),h.useEffect(()=>()=>{j.dispose(),v.dispose()},[j]),h.createElement("primitive",V({object:S,ref:f},c),h.createElement("primitive",{object:j,attach:"geometry"}),h.createElement("primitive",V({object:v,attach:"material",color:t,vertexColors:!!o,resolution:[x.width,x.height],linewidth:(p=i??s)!==null&&p!==void 0?p:1,dashed:l,transparent:d===4},c)))});function We(n,e,t,o){var i;return i=class extends me{constructor(s){super({vertexShader:e,fragmentShader:t,...s});for(const a in n)this.uniforms[a]=new je(n[a]),Object.defineProperty(this,a,{get(){return this.uniforms[a].value},set(l){this.uniforms[a].value=l}});this.uniforms=Q.clone(this.uniforms)}},i.key=he.generateUUID(),i}const He=()=>parseInt(fe.replace(/\D+/g,"")),ke=He(),Fe=We({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new N,sectionColor:new N,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new w,worldPlanePosition:new w},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${ke>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Ne=h.forwardRef(({args:n,cellColor:e="#000000",sectionColor:t="#2080ff",cellSize:o=.5,sectionSize:i=1,followCamera:s=!1,infiniteGrid:a=!1,fadeDistance:l=100,fadeStrength:c=1,fadeFrom:f=1,cellThickness:u=.5,sectionThickness:p=1,side:x=Le,...S},v)=>{Ee({GridMaterial:Fe});const d=h.useRef(null);h.useImperativeHandle(v,()=>d.current,[]);const j=new Pe,E=new w(0,1,0),z=new w(0,0,0);ee(g=>{j.setFromNormalAndCoplanarPoint(E,z).applyMatrix4(d.current.matrixWorld);const C=d.current.material,T=C.uniforms.worldCamProjPosition,W=C.uniforms.worldPlanePosition;j.projectPoint(g.camera.position,T.value),W.value.set(0,0,0).applyMatrix4(d.current.matrixWorld)});const m={cellSize:o,sectionSize:i,cellColor:e,sectionColor:t,cellThickness:u,sectionThickness:p},y={fadeDistance:l,fadeStrength:c,fadeFrom:f,infiniteGrid:a,followCamera:s};return h.createElement("mesh",V({ref:d,frustumCulled:!1},S),h.createElement("gridMaterial",V({transparent:!0,"extensions-derivatives":!0,side:x},m,y)),h.createElement("planeGeometry",{args:n}))});function Ve({sat:n,outline:e,roofZ:t,ground:o}){const[i,s]=h.useState(null);h.useEffect(()=>{let c=!0;return new Be().load(n.url,f=>{c&&(f.colorSpace=pe,f.anisotropy=8,s(f))}),()=>{c=!1}},[n.url]);const a=h.useMemo(()=>{if(!i)return null;const c=i.clone();return c.needsUpdate=!0,c.repeat.set(1/(n.x1-n.x0),1/(n.y1-n.y0)),c.offset.set(-n.x0/(n.x1-n.x0),-n.y0/(n.y1-n.y0)),c},[i,n.x0,n.x1,n.y0,n.y1]),l=h.useMemo(()=>new te(e.map(c=>new R(c.x,c.y))),[e]);return i?r.jsxs(r.Fragment,{children:[r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[(n.x0+n.x1)/2,.02,-(n.y0+n.y1)/2],receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[n.x1-n.x0,n.y1-n.y0]}),r.jsx("meshStandardMaterial",{map:i,roughness:1})]}),!o&&a&&r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,t+.015,0],receiveShadow:!0,children:[r.jsx("shapeGeometry",{args:[l]}),r.jsx("meshStandardMaterial",{map:a,roughness:1})]})]}):null}const I=(n,e,t=0)=>new w(n,t,-e);let G=null;function qe(){if(G||typeof document>"u")return G;const n=document.createElement("canvas");n.width=128,n.height=256;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,128,256);t.addColorStop(0,"#1b3560"),t.addColorStop(1,"#0e1f3d"),e.fillStyle=t,e.fillRect(0,0,128,256),e.strokeStyle="rgba(170,215,255,.45)",e.lineWidth=1.5;for(let o=0;o<=6;o++)e.beginPath(),e.moveTo(o*128/6,0),e.lineTo(o*128/6,256),e.stroke();for(let o=0;o<=12;o++)e.beginPath(),e.moveTo(0,o*256/12),e.lineTo(128,o*256/12),e.stroke();return e.strokeStyle="#c9d3df",e.lineWidth=6,e.strokeRect(0,0,128,256),G=new De(n),G.colorSpace=pe,G}function $e({outline:n,height:e,parapet:t}){const o=h.useMemo(()=>{const i=new te(n.map(a=>new R(a.x,a.y))),s=new Ue(i,{depth:e,bevelEnabled:!1});return s.rotateX(-Math.PI/2),s},[n,e]);return r.jsxs("group",{children:[r.jsx("mesh",{geometry:o,castShadow:!0,receiveShadow:!0,children:r.jsx("meshStandardMaterial",{color:"#e8dfcf",roughness:.9})}),t>.05&&n.map((i,s)=>{const a=n[(s+1)%n.length],l=Math.hypot(a.x-i.x,a.y-i.y),c=Math.atan2(a.y-i.y,a.x-i.x);return r.jsxs("mesh",{position:I((i.x+a.x)/2,(i.y+a.y)/2,e+t/2),rotation:[0,c,0],castShadow:!0,receiveShadow:!0,children:[r.jsx("boxGeometry",{args:[l+.23,t,.23]}),r.jsx("meshStandardMaterial",{color:"#f3ece0",roughness:.85})]},s)})]})}function Xe({o:n,roofZ:e,onRoof:t}){const o=t?e:0,s=e+n.h-o;if(n.kind==="tree"){const a=Math.max(n.w,n.d)/2;return r.jsxs("group",{position:I(n.x,n.y,o),children:[r.jsxs("mesh",{position:[0,s*.3,0],castShadow:!0,children:[r.jsx("cylinderGeometry",{args:[a*.12,a*.16,s*.6,8]}),r.jsx("meshStandardMaterial",{color:"#6b4423"})]}),r.jsxs("mesh",{position:[0,s*.72,0],castShadow:!0,children:[r.jsx("sphereGeometry",{args:[a,16,12]}),r.jsx("meshStandardMaterial",{color:"#2f7d47",roughness:1})]})]})}return n.round?r.jsxs("mesh",{position:I(n.x,n.y,o+s/2),castShadow:!0,receiveShadow:!0,children:[r.jsx("cylinderGeometry",{args:[n.w/2,n.w/2,s,24]}),r.jsx("meshStandardMaterial",{color:n.kind==="tank"?"#222327":"#999",roughness:.6})]}):r.jsxs("mesh",{position:I(n.x,n.y,o+s/2),castShadow:!0,receiveShadow:!0,children:[r.jsx("boxGeometry",{args:[n.w,s,n.d]}),r.jsx("meshStandardMaterial",{color:n.kind==="stair"?"#d8cdb8":"#b8bcc4",roughness:.85})]})}function Je({p:n,roofZ:e,tilt:t,azimuth:o,slopeLen:i,across:s,structureHeight:a,delay:l,showShade:c}){const f=h.useRef(null),u=h.useRef(null),p=t*Math.PI/180,x=e+a+i/2*Math.sin(p);ee(({clock:d})=>{if(!f.current)return;u.current===null&&(u.current=d.elapsedTime);const j=Math.min(1,Math.max(0,(d.elapsedTime-u.current-l)/.5)),E=1-Math.pow(1-j,3);f.current.position.y=x+(1-E)*4,f.current.scale.setScalar(.6+.4*E)});const S=qe(),v=a+i*Math.sin(p);return r.jsxs("group",{ref:f,position:[n.x,x+4,-n.y],rotation:[0,Math.PI-o*Math.PI/180,0],children:[r.jsx("group",{rotation:[p,0,0],children:r.jsxs("mesh",{castShadow:!0,receiveShadow:!0,children:[r.jsx("boxGeometry",{args:[s-.02,.04,i-.02]}),r.jsx("meshStandardMaterial",{map:c?null:S,color:c?Te(n.shade??0):"#ffffff",metalness:.35,roughness:.25})]})}),[-1,1].map(d=>r.jsxs("group",{children:[r.jsxs("mesh",{position:[d*(s/2-.1),-(x-e)+a/2,i/2*Math.cos(p)],children:[r.jsx("boxGeometry",{args:[.04,a,.04]}),r.jsx("meshStandardMaterial",{color:"#8d97a3",metalness:.7})]}),r.jsxs("mesh",{position:[d*(s/2-.1),-(x-e)+v/2,-(i/2)*Math.cos(p)],children:[r.jsx("boxGeometry",{args:[.04,v,.04]}),r.jsx("meshStandardMaterial",{color:"#8d97a3",metalness:.7})]})]},d))]})}function Ke({sun:n,center:e,radius:t}){const o=h.useRef(null),{scene:i}=Z();h.useEffect(()=>{o.current&&(o.current.target.position.copy(e),i.add(o.current.target))},[e,i]);const s=n&&n.altitude>0,a=n?new w(n.vec[0],n.vec[2],-n.vec[1]):new w(0,1,.3),l=e.clone().add(a.clone().multiplyScalar(t*2.2)),c=(n==null?void 0:n.altitude)??45,f=new N().setHSL(.1,.9,Math.min(.9,.55+c/150)),u=t*1.4;return r.jsxs(r.Fragment,{children:[r.jsx("directionalLight",{ref:o,position:l,intensity:s?2.6:.05,color:f,castShadow:!0,"shadow-mapSize":[2048,2048],"shadow-bias":-4e-4,"shadow-camera-left":-u,"shadow-camera-right":u,"shadow-camera-top":u,"shadow-camera-bottom":-u,"shadow-camera-near":.5,"shadow-camera-far":t*6}),r.jsx("hemisphereLight",{args:["#bfe3ff","#6b5a3a",s?.55:.15]}),s&&r.jsxs("mesh",{position:l,children:[r.jsx("sphereGeometry",{args:[t*.08,24,16]}),r.jsx("meshBasicMaterial",{color:"#ffd56b"})]})]})}function Qe({cx:n,cy:e,radius:t}){const o=h.useRef(null),i=h.useRef(null);return ee(s=>{const a=s.clock.elapsedTime;if(o.current){const l=1+.04*Math.sin(a*1.6);o.current.scale.set(l,l,1),o.current.material.opacity=.35+.2*Math.sin(a*1.6)}i.current&&(i.current.rotation.z=-a*.6)}),r.jsxs("group",{position:[n,.04,-e],children:[r.jsx(Ne,{args:[t*8,t*8],cellSize:1,cellThickness:.6,cellColor:"#2bb3d9",sectionSize:5,sectionThickness:1.2,sectionColor:"#5fe0ff",fadeDistance:t*4.5,fadeStrength:1.4,followCamera:!1}),r.jsxs("mesh",{ref:o,rotation:[-Math.PI/2,0,0],children:[r.jsx("ringGeometry",{args:[t*.95,t*.97,128]}),r.jsx("meshBasicMaterial",{color:"#5fe0ff",transparent:!0,opacity:.45,depthWrite:!1,toneMapped:!1})]}),r.jsxs("mesh",{ref:i,rotation:[-Math.PI/2,0,0],children:[r.jsx("ringGeometry",{args:[t*.2,t*.95,64,1,0,Math.PI/5]}),r.jsx("meshBasicMaterial",{color:"#5fe0ff",transparent:!0,opacity:.08,depthWrite:!1,side:Ce,toneMapped:!1})]})]})}function Ye({onCapture:n}){const{gl:e,scene:t,camera:o}=Z();return h.useEffect(()=>(n==null||n(()=>{if(e.getContext().isContextLost())throw new Error("3D view is not open");return e.render(t,o),e.domElement.toDataURL("image/png")}),()=>n==null?void 0:n(null)),[e,t,o,n]),null}function Et(n){const{outline:e,buildingHeight:t,parapet:o,obstacles:i,panels:s,sun:a,sunPath:l,revision:c,ground:f}=n,u=f?0:t,p=e.map(g=>g.x),x=e.map(g=>g.y),S=(Math.min(...p)+Math.max(...p))/2,v=(Math.min(...x)+Math.max(...x))/2,d=Math.max(Math.max(...p)-Math.min(...p),Math.max(...x)-Math.min(...x),8),j=h.useMemo(()=>I(S,v,u),[S,v,u]),E=g=>{let C=!1;for(let T=0,W=e.length-1;T<e.length;W=T++){const O=e[T],q=e[W];O.y>g.y!=q.y>g.y&&g.x<(q.x-O.x)*(g.y-O.y)/(q.y-O.y)+O.x&&(C=!C)}return C},z=(a==null?void 0:a.altitude)??40,m=z<=0?"#0b1630":z<12?"#e9a46b":"#9fd0f5",y=l.filter(g=>g.altitude>0).map(g=>j.clone().add(new w(g.vec[0],g.vec[2],-g.vec[1]).multiplyScalar(d*2.2)));return r.jsxs(Ae,{shadows:!0,dpr:[1,2],gl:{preserveDrawingBuffer:!0,antialias:!0},camera:{position:[S+d*.9,u+d*.9,-v+d*1.4],fov:42},children:[r.jsx("color",{attach:"background",args:[m]}),r.jsx("fog",{attach:"fog",args:[m,d*4,d*9]}),r.jsx(Ke,{sun:a,center:j,radius:d}),r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[S,0,-v],receiveShadow:!0,children:[r.jsx("planeGeometry",{args:[d*12,d*12]}),r.jsx("meshStandardMaterial",{color:f?"#8a7a4c":"#7ea36b",roughness:1})]}),r.jsx(Qe,{cx:S,cy:v,radius:d}),!f&&r.jsx($e,{outline:e,height:t,parapet:o}),n.satellite&&r.jsx(Ve,{sat:n.satellite,outline:e,roofZ:u,ground:f}),f&&r.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[S,.01,-v],receiveShadow:!0,children:[r.jsx("shapeGeometry",{args:[new te(e.map(g=>new R(g.x-S,g.y-v)))]}),r.jsx("meshStandardMaterial",{color:"#a08d55",roughness:1})]}),i.map(g=>r.jsx(Xe,{o:g,roofZ:u,onRoof:!f&&E(g)},g.id)),r.jsx("group",{children:s.map((g,C)=>r.jsx(Je,{p:g,roofZ:u+(f?0:.02),tilt:n.tilt,azimuth:n.azimuth,slopeLen:n.slopeLen,across:n.across,structureHeight:n.structureHeight,delay:Math.min(C*.025,1.2),showShade:n.showShade},g.id))},c),y.length>1&&r.jsx(Re,{points:y,color:"#ffcf4d",lineWidth:1.5,dashed:!0,dashSize:d*.08,gapSize:d*.05}),r.jsx(ze,{target:j,maxPolarAngle:Math.PI/2.05,minDistance:d*.4,maxDistance:d*5,enableDamping:!0}),r.jsx(Ye,{onCapture:n.onCapture})]})}export{Et as default};
