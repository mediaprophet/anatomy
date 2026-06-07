/**
 * qualia.js
 * 
 * Small helper module for embedding QualiaDB WASM into Qualia Anatomy.
 * 
 * Designed for v0.0.2-dev of the anatomy repo.
 * Prepares for QualiaDB v0.0.6 WASM release.
 * 
 * Usage:
 *   <script src="qualia.js"></script>
 *   await Qualia.init();
 *   Qualia.insertSpatialEntity({...});
 */

const Qualia = (() => {
  let instance = null;
  let isInitialized = false;
  let logCallback = null;

  function log(message) {
    const timestamp = new Date().toLocaleTimeString();
    const fullMsg = `${timestamp} — ${message}`;
    
    if (logCallback) {
      logCallback(fullMsg);
    } else {
      console.log("[Qualia]", fullMsg);
    }
  }

  /**
   * Set a custom logging function (e.g. to update a UI panel)
   */
  function setLogCallback(callback) {
    logCallback = callback;
  }

  /**
   * Initialize QualiaDB WASM
   * 
   * In production this will load the real WASM from the v0.0.6 release.
   * For now it runs in simulation mode until the WASM glue code is integrated.
   */
  async function init(options = {}) {
    if (isInitialized) {
      log("QualiaDB already initialized");
      return true;
    }

    log("Initializing QualiaDB WASM...");

    try {
      // =====================================================
      // REAL WASM LOADING (uncomment when ready)
      // =====================================================
      // const wasmUrl = options.wasmUrl || 
      //   "https://raw.githubusercontent.com/mediaprophet/qualiaDB/v0.0.6/sdk/wasm/qualia_wasm_bg.wasm";
      // 
      // const { default: initWasm, QualiaDB } = await import(
      //   options.glueUrl || "./qualia_wasm.js"
      // );
      // 
      // await initWasm(wasmUrl);
      // instance = new QualiaDB();
      // =====================================================

      // Simulation mode for v0.0.2-dev
      await new Promise(resolve => setTimeout(resolve, 450));

      instance = {
        version: "0.0.6-sim",
        initializedAt: new Date().toISOString(),
        
        // Placeholder methods — will be replaced by real WASM exports
        create_spatial_entity(data) {
          log(`[Sim] Created spatial entity: ${data.name || "unnamed"}`);
          return { id: Date.now(), ...data };
        },

        insert_tuple(quin) {
          log(`[Sim] Inserted Quin: ${JSON.stringify(quin).slice(0, 80)}...`);
          return true;
        }
      };

      isInitialized = true;
      log(`QualiaDB initialized (simulation mode — v0.0.6)`);
      return true;

    } catch (error) {
      log(`Initialization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Insert a spatial entity (anatomical structure from HRA .glb)
   * This will eventually create proper Quin 5-tuples with spatial + consent metadata.
   */
  function insertSpatialEntity(entityData) {
    if (!isInitialized || !instance) {
      log("QualiaDB not initialized. Call Qualia.init() first.");
      return null;
    }

    const enriched = {
      type: "SpatialEntity",
      source: "HRA-3D-Reference",
      timestamp: new Date().toISOString(),
      ...entityData
    };

    // In real mode this will call the WASM method
    if (instance.create_spatial_entity) {
      return instance.create_spatial_entity(enriched);
    }

    log(`Inserted spatial entity: ${enriched.name}`);
    return enriched;
  }

  /**
   * Get current status
   */
  function getStatus() {
    return {
      initialized: isInitialized,
      version: instance ? instance.version : null,
      instance: !!instance
    };
  }

  // Public API
  return {
    init,
    insertSpatialEntity,
    getStatus,
    setLogCallback,
    
    // Internal access (for advanced use)
    _getInstance: () => instance
  };
})();

// Make it available globally when loaded via <script>
if (typeof window !== "undefined") {
  window.Qualia = Qualia;
}

// ES Module export (for future bundling)
if (typeof module !== "undefined" && module.exports) {
  module.exports = Qualia;
}