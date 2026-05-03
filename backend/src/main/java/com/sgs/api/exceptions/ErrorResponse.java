package com.sgs.api.exceptions;

import java.time.LocalDateTime;

public class ErrorResponse {

  private int status;
  private String mensagem;
  private LocalDateTime timestamp;

  public ErrorResponse(int status, String mensagem) {
    this.status     = status;
    this.mensagem   = mensagem;
    this.timestamp  = LocalDateTime.now();
  }

  public int getStatus() {
    return status;
  }

  public String getMensagem() {
    return mensagem;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }
}
