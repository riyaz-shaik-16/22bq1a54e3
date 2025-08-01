import Url from '../models/url.model.js';
import { generateShortcode } from '../utils/generateShortCode.js';
import { Log } from '../../../LoggingMiddleware/log.middleware.js';

export async function createShortUrl(req, res) {
  try {
    const { url, validity = 30, shortcode } = req.body;
    const shortCode = shortcode || generateShortcode();

    const exists = await Url.findOne({ shortcode: shortCode });
    if (exists) {
      await Log('backend', 'warn', 'controller', 'Shortcode already in use');
      return res.status(400).json({ error: 'Shortcode already exists.' });
    }

    const expiry = new Date(Date.now() + validity * 60 * 1000);

    const newUrl = await Url.create({ url, shortcode: shortCode, expiry });

    await Log('backend', 'info', 'controller', 'Short URL created');

    return res.status(201).json({
      shortLink: `https://${req.headers.host}/${shortCode}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    await Log('backend', 'error', 'controller', 'Error creating short URL');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function redirectShortUrl(req, res) {
  try {
    const { shortcode } = req.params;
    const entry = await Url.findOne({ shortcode });

    if (!entry) {
      await Log('backend', 'warn', 'controller', 'Shortcode not found');
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    if (new Date() > entry.expiry) {
      await Log('backend', 'info', 'controller', 'Shortcode has expired');
      return res.status(410).json({ error: 'Link expired' });
    }

    entry.clicks.push({
      timestamp: new Date(),
      source: req.headers.referer || null,
      location: req.ip,
    });

    await entry.save();

    await Log('backend', 'info', 'controller', 'User redirected');

    return res.redirect(entry.url);
  } catch (err) {
    await Log('backend', 'error', 'controller', 'Redirect failed');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getStats(req, res) {
  try {
    const { shortcode } = req.params;
    const entry = await Url.findOne({ shortcode });

    if (!entry) {
      await Log('backend', 'warn', 'controller', 'Stats: shortcode not found');
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    await Log('backend', 'info', 'controller', 'Stats fetched');

    return res.status(200).json({
      url: entry.url,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      clicks: entry.clicks.length,
      interactions: entry.clicks,
    });
  } catch (err) {
    await Log('backend', 'error', 'controller', 'Stats fetch error');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
