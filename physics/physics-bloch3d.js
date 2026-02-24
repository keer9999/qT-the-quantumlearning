(function(){
  // Simple WebGL Bloch sphere renderer (no external libs)
  const Bloch3D = {
    gl: null,
    canvas: null,
    program: null,
    arrowProgram: null,
    buffers: {},
    theta: 60, phi: 30,
    target: null,
    animId: null,
    init(canvasId){
      const canvas = document.getElementById(canvasId);
      if(!canvas) return;
      this.canvas = canvas;
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if(!gl) return console.warn('WebGL not supported');
      this.gl = gl;
      this._setupShaders();
      this._buildSphere(36,36);
      this._buildArrow();
      this.resize();
      window.addEventListener('resize',()=>this.resize());
      this.draw();
    },
    resize(){
      if(!this.canvas || !this.gl) return;
      const dpr = window.devicePixelRatio || 1;
      const w = this.canvas.clientWidth * dpr;
      const h = this.canvas.clientHeight * dpr;
      if(this.canvas.width!==w || this.canvas.height!==h){
        this.canvas.width = w; this.canvas.height = h;
        this.gl.viewport(0,0,w,h);
      }
    },
    _compile(src, type){
      const gl = this.gl; const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null;
      }
      return s;
    },
    _link(vs, fs){
      const gl = this.gl; const p = gl.createProgram();
      gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
      if(!gl.getProgramParameter(p, gl.LINK_STATUS)){
        console.error(gl.getProgramInfoLog(p)); return null;
      }
      return p;
    },
    _setupShaders(){
      const gl = this.gl;
      const vs = `attribute vec3 aPos; attribute vec3 aNormal; uniform mat4 uMVP; uniform mat4 uModel; varying vec3 vNormal; varying vec3 vPos; void main(){ vNormal = mat3(uModel)*aNormal; vPos = (uModel*vec4(aPos,1.0)).xyz; gl_Position = uMVP * vec4(aPos,1.0); }`;
      const fs = `precision mediump float; varying vec3 vNormal; varying vec3 vPos; uniform vec3 uColor; void main(){ vec3 light = normalize(vec3(1.0,1.0,0.8)); float diff = max(dot(normalize(vNormal), light), 0.0); vec3 base = uColor * 0.9 + vec3(0.05);
        gl_FragColor = vec4(base * (0.3 + 0.7*diff), 1.0);
      }`;
      const vshader = this._compile(vs, gl.VERTEX_SHADER);
      const fshader = this._compile(fs, gl.FRAGMENT_SHADER);
      this.program = this._link(vshader, fshader);
      this.locations = {
        aPos: gl.getAttribLocation(this.program, 'aPos'),
        aNormal: gl.getAttribLocation(this.program, 'aNormal'),
        uMVP: gl.getUniformLocation(this.program, 'uMVP'),
        uModel: gl.getUniformLocation(this.program, 'uModel'),
        uColor: gl.getUniformLocation(this.program, 'uColor')
      };
    },
    _buildSphere(latBands, longBands){
      const verts=[]; const norms=[]; const idx=[];
      for(let lat=0; lat<=latBands; lat++){
        const theta = lat * Math.PI / latBands;
        for(let lon=0; lon<=longBands; lon++){
          const phi = lon * 2*Math.PI / longBands;
          const x = Math.sin(theta)*Math.cos(phi);
          const y = Math.cos(theta);
          const z = Math.sin(theta)*Math.sin(phi);
          verts.push(x,y,z); norms.push(x,y,z);
        }
      }
      for(let lat=0; lat<latBands; lat++){
        for(let lon=0; lon<longBands; lon++){
          const first = (lat*(longBands+1)) + lon;
          const second = first + longBands + 1;
          idx.push(first, second, first+1);
          idx.push(second, second+1, first+1);
        }
      }
      const gl=this.gl;
      this.buffers.sphere = {
        v: this._createArrayBuffer(new Float32Array(verts)),
        n: this._createArrayBuffer(new Float32Array(norms)),
        i: this._createElementArray(new Uint16Array(idx)),
        count: idx.length
      };
    },
    _buildArrow(){
      // simple line from origin to (0,0,1) as unit arrow; we'll scale per state
      const verts = new Float32Array([0,0,0, 0,0,1]);
      const gl=this.gl;
      this.buffers.arrow = {v: this._createArrayBuffer(verts), count: 2};
    },
    _createArrayBuffer(arr){ const gl=this.gl; const b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW); return b; },
    _createElementArray(arr){ const gl=this.gl; const b=gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arr, gl.STATIC_DRAW); return b; },
    draw(){
      this.resize();
      const gl = this.gl; if(!gl) return;
      gl.clearColor(0.03,0.03,0.03,0.0); gl.enable(gl.DEPTH_TEST); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const w = this.canvas.width, h = this.canvas.height;
      const aspect = w/h;
      const proj = mat4.perspective(45, aspect, 0.1, 100);
      const eye = [0,0,4];
      const center=[0,0,0];
      const up=[0,1,0];
      const view = mat4.lookAt(eye, center, up);
      const model = mat4.identity();
      // rotate so +z up corresponds to Bloch coords (theta from z)
      const rot = mat4.mul(mat4.rotateX(mat4.identity(), -20*Math.PI/180), mat4.identity());
      const mvp = mat4.mul(proj, mat4.mul(view, model));
      gl.useProgram(this.program);
      gl.uniformMatrix4fv(this.locations.uMVP, false, mvp);
      gl.uniformMatrix4fv(this.locations.uModel, false, model);
      // sphere
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.sphere.v); gl.enableVertexAttribArray(this.locations.aPos); gl.vertexAttribPointer(this.locations.aPos,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.sphere.n); gl.enableVertexAttribArray(this.locations.aNormal); gl.vertexAttribPointer(this.locations.aNormal,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.sphere.i);
      gl.uniform3fv(this.locations.uColor, [0.08,0.55,0.95]);
      gl.drawElements(gl.TRIANGLES, this.buffers.sphere.count, gl.UNSIGNED_SHORT, 0);
      // arrow: compute vector from theta/phi
      const th = this.theta * Math.PI/180; const ph = this.phi * Math.PI/180;
      const x = Math.sin(th)*Math.cos(ph);
      const y = Math.cos(th);
      const z = Math.sin(th)*Math.sin(ph);
      // build model to align arrow (scale and rotate)
      const arrowModel = mat4.translate(mat4.identity(), [0,0,0]);
      const mvpArrow = mat4.mul(proj, mat4.mul(view, arrowModel));
      gl.uniformMatrix4fv(this.locations.uMVP, false, mvpArrow);
      gl.uniformMatrix4fv(this.locations.uModel, false, arrowModel);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.arrow.v);
      gl.enableVertexAttribArray(this.locations.aPos); gl.vertexAttribPointer(this.locations.aPos,3,gl.FLOAT,false,0,0);
      // since arrow has no normals, set normal to up via workaround
      gl.disableVertexAttribArray(this.locations.aNormal);
      gl.vertexAttrib3f(this.locations.aNormal, 0.0, 1.0, 0.0);
      gl.uniform3fv(this.locations.uColor, [1.0,0.2,0.2]);
      // draw line transformed by simple projection math using gl.LINEs by copying arrow vertices scaled to state
      // we'll use gl.drawArrays with a dynamic trick: update buffer with transformed end point
      const arrowPts = new Float32Array([0,0,0, x,y,z]);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.arrow.v); gl.bufferData(gl.ARRAY_BUFFER, arrowPts, gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.LINES, 0, 2);
    },
    applyGate(gate){
      // compute new theta/phi similar to 2D logic
      let th = this.theta * Math.PI/180; let ph = this.phi * Math.PI/180;
      let nx = Math.sin(th)*Math.cos(ph); let ny = Math.sin(th)*Math.sin(ph); let nz = Math.cos(th);
      if(gate==='X'){ nx = nx; ny = -ny; nz = -nz; }
      if(gate==='Y'){ nx = -nx; ny = ny; nz = -nz; }
      if(gate==='Z'){ nx = -nx; ny = -ny; nz = nz; }
      if(gate==='H'){ const tx = nz; const tz = nx; nx = tx; nz = tz; ny = -ny; }
      const newTheta = Math.acos(nz) * 180/Math.PI; const newPhi = (Math.atan2(ny,nx)*180/Math.PI+360)%360;
      this.animateTo(newTheta, newPhi);
    },
    animateTo(targetTheta, targetPhi, ms){
      if(this.animId) cancelAnimationFrame(this.animId);
      const startT = this.theta, startP = this.phi; const dur = ms||350; const start = performance.now();
      const step = (now)=>{
        const t = Math.min(1, (now-start)/dur);
        // shortest phi interp
        let d = targetPhi - startP; if(d>180) d-=360; if(d<-180) d+=360;
        this.theta = startT + (targetTheta-startT)*t;
        this.phi = (startP + d*t + 360)%360;
        this.draw();
        if(t<1) this.animId = requestAnimationFrame(step); else this.animId = null;
      };
      this.animId = requestAnimationFrame(step);
    },
    reset(){ this.theta = 60; this.phi = 30; this.draw(); }
  };
  // small matrix helpers
  const mat4 = {
    identity(){ return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]); },
    translate(m, v){ const out = mat4.identity(); out[12]=v[0]; out[13]=v[1]; out[14]=v[2]; return out; },
    perspective(fovy, aspect, near, far){ const f = 1/Math.tan(fovy*Math.PI/180/2); const nf = 1/(near-far); const out = new Float32Array(16);
      out[0]=f/aspect; out[1]=0; out[2]=0; out[3]=0; out[4]=0; out[5]=f; out[6]=0; out[7]=0; out[8]=0; out[9]=0; out[10]=(far+near)*nf; out[11]=-1; out[12]=0; out[13]=0; out[14]=(2*far*near)*nf; out[15]=0; return out; },
    lookAt(eye, center, up){ const out = mat4.identity(); const x0=eye[0],x1=eye[1],x2=eye[2]; const y0=center[0],y1=center[1],y2=center[2];
      let zx = x0-y0, zy = x1-y1, zz = x2-y2; let len = Math.hypot(zx,zy,zz); zx/=len; zy/=len; zz/=len;
      let xx = up[1]*zz - up[2]*zy; let xy = up[2]*zx - up[0]*zz; let xz = up[0]*zy - up[1]*zx; len = Math.hypot(xx,xy,xz); xx/=len; xy/=len; xz/=len;
      let yx = zy*xz - zz*xy; let yy = zz*xx - zx*xz; let yz = zx*xy - zy*xx;
      out[0]=xx; out[1]=yx; out[2]=zx; out[3]=0; out[4]=xy; out[5]=yy; out[6]=zy; out[7]=0; out[8]=xz; out[9]=yz; out[10]=zz; out[11]=0; out[12]=-(xx*x0 + xy*x1 + xz*x2); out[13]=-(yx*x0 + yy*x1 + yz*x2); out[14]=-(zx*x0 + zy*x1 + zz*x2); out[15]=1; return out; },
    mul(a,b){ const out = new Float32Array(16); for(let i=0;i<4;i++){ for(let j=0;j<4;j++){ let s=0; for(let k=0;k<4;k++) s+=a[i*4+k]*b[k*4+j]; out[i*4+j]=s; }} return out; },
    rotateX(m, ang){ const c=Math.cos(ang), s=Math.sin(ang); const r=mat4.identity(); r[5]=c; r[6]=s; r[9]=-s; r[10]=c; return mat4.mul(m,r); }
  };
  window.Bloch3D = Bloch3D;
  // auto-init if canvas present
  document.addEventListener('DOMContentLoaded', ()=>{ try{ Bloch3D.init('bloch3dCanvas'); }catch(e){} });
})();