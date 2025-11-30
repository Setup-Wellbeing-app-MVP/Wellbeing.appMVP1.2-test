import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b9baeec9/health", (c) => {
  return c.json({ status: "ok" });
});

// Temporary endpoint to list font files in storage bucket
app.get("/make-server-b9baeec9/list-fonts", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const allFontFiles: { name: string; publicUrl: string; folder: string }[] = [];

    // List folders in the root
    const { data: rootFiles, error: rootError } = await supabase.storage
      .from('Fonts')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (rootError) {
      console.error('Error listing root fonts:', rootError);
      return c.json({ error: rootError.message }, 500);
    }

    // Check each item - if it's a folder, list its contents
    for (const item of rootFiles || []) {
      // List contents of Lufga folder
      if (item.name === 'Lufga') {
        const { data: lufgaFiles, error: lufgaError } = await supabase.storage
          .from('Fonts')
          .list('Lufga', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (!lufgaError && lufgaFiles) {
          for (const file of lufgaFiles) {
            const { data } = supabase.storage
              .from('Fonts')
              .getPublicUrl(`Lufga/${file.name}`);
            
            allFontFiles.push({
              name: file.name,
              publicUrl: data.publicUrl,
              folder: 'Lufga'
            });
          }
        }
      }

      // List contents of Geist folder
      if (item.name === 'Geist') {
        const { data: geistFiles, error: geistError } = await supabase.storage
          .from('Fonts')
          .list('Geist', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (!geistError && geistFiles) {
          for (const file of geistFiles) {
            const { data } = supabase.storage
              .from('Fonts')
              .getPublicUrl(`Geist/${file.name}`);
            
            allFontFiles.push({
              name: file.name,
              publicUrl: data.publicUrl,
              folder: 'Geist'
            });
          }
        }
      }
    }

    return c.json({ files: allFontFiles });
  } catch (error) {
    console.error('Error in list-fonts endpoint:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Endpoint to list icons from private bucket with signed URLs
app.get("/make-server-b9baeec9/assets/icons", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: files, error } = await supabase.storage
      .from('Icons')
      .list('', {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error listing icons from Icons bucket:', error);
      return c.json({ error: `Failed to list Icons bucket: ${error.message}`, files: [] }, 200);
    }

    console.log(`Found ${files?.length || 0} files in Icons bucket`);

    // Generate signed URLs for each file (valid for 1 hour)
    const iconsWithUrls = await Promise.all(
      (files || []).map(async (file) => {
        const { data, error: urlError } = await supabase.storage
          .from('Icons')
          .createSignedUrl(file.name, 3600); // 1 hour expiry

        if (urlError) {
          console.error(`Error creating signed URL for ${file.name}:`, urlError);
          return { name: file.name, signedUrl: null, error: urlError.message };
        }

        return {
          name: file.name,
          signedUrl: data.signedUrl,
        };
      })
    );

    const successfulIcons = iconsWithUrls.filter(i => i.signedUrl);
    console.log(`Successfully generated ${successfulIcons.length} signed URLs for icons`);

    return c.json({ files: iconsWithUrls, totalFiles: files?.length || 0, successfulUrls: successfulIcons.length });
  } catch (error) {
    console.error('Error in assets/icons endpoint:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Endpoint to list illustrations from private bucket with signed URLs
app.get("/make-server-b9baeec9/assets/illustrations", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: files, error } = await supabase.storage
      .from('Illus')
      .list('', {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error listing illustrations from Illus bucket:', error);
      return c.json({ error: `Failed to list Illus bucket: ${error.message}`, files: [] }, 200);
    }

    console.log(`Found ${files?.length || 0} files in Illus bucket`);

    // Generate signed URLs for each file (valid for 1 hour)
    const illustrationsWithUrls = await Promise.all(
      (files || []).map(async (file) => {
        const { data, error: urlError } = await supabase.storage
          .from('Illus')
          .createSignedUrl(file.name, 3600); // 1 hour expiry

        if (urlError) {
          console.error(`Error creating signed URL for ${file.name}:`, urlError);
          return { name: file.name, signedUrl: null, error: urlError.message };
        }

        return {
          name: file.name,
          signedUrl: data.signedUrl,
        };
      })
    );

    const successfulIllustrations = illustrationsWithUrls.filter(i => i.signedUrl);
    console.log(`Successfully generated ${successfulIllustrations.length} signed URLs for illustrations`);

    return c.json({ files: illustrationsWithUrls, totalFiles: files?.length || 0, successfulUrls: successfulIllustrations.length });
  } catch (error) {
    console.error('Error in assets/illustrations endpoint:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Endpoint to list logos from private bucket with signed URLs
app.get("/make-server-b9baeec9/assets/logos", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: files, error } = await supabase.storage
      .from('Logos')
      .list('', {
        limit: 1000,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Error listing logos from Logos bucket:', error);
      return c.json({ error: `Failed to list Logos bucket: ${error.message}`, files: [] }, 200);
    }

    console.log(`Found ${files?.length || 0} files in Logos bucket`);

    // Generate signed URLs for each file (valid for 1 hour)
    const logosWithUrls = await Promise.all(
      (files || []).map(async (file) => {
        const { data, error: urlError } = await supabase.storage
          .from('Logos')
          .createSignedUrl(file.name, 3600); // 1 hour expiry

        if (urlError) {
          console.error(`Error creating signed URL for ${file.name}:`, urlError);
          return { name: file.name, signedUrl: null, error: urlError.message };
        }

        return {
          name: file.name,
          signedUrl: data.signedUrl,
        };
      })
    );

    const successfulLogos = logosWithUrls.filter(l => l.signedUrl);
    console.log(`Successfully generated ${successfulLogos.length} signed URLs for logos`);

    return c.json({ files: logosWithUrls, totalFiles: files?.length || 0, successfulUrls: successfulLogos.length });
  } catch (error) {
    console.error('Error in assets/logos endpoint:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);