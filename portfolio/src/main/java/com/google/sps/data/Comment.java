package com.google.sps.data;

public final class Comment {

  private final long id;
  private final String name;
  private final String message;
  private final String imageUrl;
  private final long timestamp;

  public Comment(long id, String name, String message, String imageUrl, long timestamp) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.imageUrl = imageUrl;
    this.timestamp = timestamp;
  }
}